import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import "../../style/components/editPrinterForms.css";
import elipse6 from '../../assets/elipse6.svg';
import { getPrinterSchema } from "../utils/YupSchema";
import { Link, useNavigate, useParams } from "react-router-dom";
import PropTypes from 'prop-types';
import { getUnidades } from "../../services/unidadeService";
import { editImpressora, getPadroes } from "../../services/printerService";
import { formatDate } from "../../utils/utils";
import { toast } from "react-toastify";

const fieldLabels = {
  padrao_id: 'Padrão',
  ip: 'IP',
  numeroSerie: 'Número de Série',
  codigoLocadora: 'Código da Locadora',
  contadorInstalacao: 'Contador de Instalação',
  dataInstalacao: 'Data de Instalação',
  contadorRetiradas: 'Contador de Retirada',
  dataContadorRetirada: 'Data de Retirada',
  ultimoContador: 'Último Contador',
  dataUltimoContador: 'Data do Último Contador',
  unidadePai: 'Unidade Pai',
  unidadeId: 'Unidade Filho',
};

export default function EditPrinterForm() {

  const { printer } = useParams();

  const navigate = useNavigate();
  const printerObject = JSON.parse(atob(printer));

  const [unidadeList, setUnidadeList] = useState([]);
  const [padroes, setPadroes] = useState([]);
  const [unidadesFilha, setUnidadesFilhas] = useState([]);
  const [padrao, setPadrao] = useState(printerObject.padrao_id);
  const [unidade, setUnidade] = useState(printerObject.unidadeId);
  const [inicializou, setInicializou] = useState(false);	

  const editPrinterSchema = getPrinterSchema(fieldLabels);
  const { register, setValue, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm({
    resolver: yupResolver(editPrinterSchema),
    mode: "onSubmit"
  });

  useEffect( () => {
    async function setData() {
        const [dataUnidades, dataPadrao] = await Promise.all([
          getUnidades(),
          getPadroes(),
        ]);
            
        if (dataUnidades.type ==='success' && dataUnidades.data) {
          setUnidadeList(dataUnidades.data);
          setUnidadesFilhas(dataUnidades.data);
        }
        if (dataPadrao.type ==='success' && dataPadrao.data) {
          setPadroes(dataPadrao.data);
        }
    }
    setData();
  }, []);

  useEffect(() => {
    if (padroes.length > 0 && unidadeList.length > 0 && !inicializou) {
      Object.entries(printerObject).forEach(([key, value]) => {
        if (key.includes('data')) {
          value = formatDate(value);
        }
        setValue(key, value);
      });
      setInicializou(true);
    }
  }, [setValue, printerObject]);

  const handleWorkstationChange = (event) => {
    if (event.target.value) {

        const selectedUnit = unidadeList.find(uni => uni.id === event.target.value);
        if (selectedUnit) {
            const combinedList = [selectedUnit, ...selectedUnit.child_workstations];
            setUnidadesFilhas(combinedList);
        } else {
            setUnidadesFilhas([]);
        }
    } else {
        setUnidadesFilhas([]);
    }
  };


  const onSubmit = async (data) => {
    data.padrao_id = padrao;
    data.unidadeId = unidade;
    data.dataInstalacao =  new Date(data.dataInstalacao).toISOString();
    data.dataContadorRetirada =  new Date(data.dataContadorRetirada).toISOString();
    data.dataUltimoContador =  new Date(data.dataUltimoContador).toISOString();
    const response = await editImpressora(data);
    if (response.type === "success") {
      toast.success("Impressora editada com sucesso!");
      setTimeout(() => {
        reset();
        navigate("/impressorascadastradas");
    }, 1000);
    } else {
      toast.error("Erro ao editar impressora!");
    }
  }

  return (
    <div id="editPrinter-card">
    
      <Link id="link-back" to="/impressorascadastradas"> 
      
      Voltar</Link>
     
      <header id="form-header">
        Editar impressora
      </header>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div id="input-group">
          {Object.entries(fieldLabels).map(([key, label]) => (
            <div id="input-line" key={key}>
              <div id="input-line" key={key}>
              <div id="input-box">
                <label>
                  {label.charAt(0).toUpperCase() + label.slice(1)}
                  <span>*</span>
                </label>
                {key === "padrao_id" ? (
                  <select {...register(key)} onChange={(e) => setPadrao(e.target.value)} data-testid="padrao-select">
                    {padroes.map(option => (
                      <option key={option.id} value={option.id} >
                        {option.tipo}, {option.marca}, {option.modelo}
                      </option>
                    ))}
                  </select>                      
                ) : key === "unidadePai" ? (
                  <select onChange={handleWorkstationChange} data-testid="unidadePai-select">
                    {unidadeList.map(option => (
                      <option key={option.id} value={option.id}>
                        {option.name}
                      </option>
                    ))}
                  </select>
                ) : key === "unidadeId" ? (
                  <select {...register(key)} onChange={(e) => setUnidade(e.target.value)} data-testid="unidadeFilha-select">
                    {unidadesFilha.map(option => (
                      <option key={option.id} value={option.id}>
                        {option.name}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    {...register(key)}
                    type={key.includes('data') ? 'date': key === "ultimoContador" || key === "contadorRetiradas" || key === "contadorInstalacao" ? 'number' : 'text'}
                    placeholder={label.charAt(0).toUpperCase() + label.slice(1)}
                  />
                )}
                <span>{errors[key]?.message}</span>
              </div>
            </div>
            </div>
          ))}
        </div>
        <div id="buttons">
          <button className="form-button" type="button" id="cancelar-bnt">CANCELAR</button>
          <button className="form-button" type="submit" id="editar-bnt" disabled={isSubmitting}>EDITAR</button>
        </div>
      </form>
      <div className="elipse-signup">
        <img alt="elipse" src={elipse6} />
      </div>
    </div>
  );
}
