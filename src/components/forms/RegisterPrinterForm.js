import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ReloadIcon } from "@radix-ui/react-icons";
import elipse6 from "../../assets/elipse6.svg";
import { createImpressora, getPadroes } from "../../services/printerService";
import { getUnidades } from "../../services/unidadeService";
import { getUsers } from "../../services/userService";
import "../../style/components/registerPrinterForms.css";
import { getPrinterSchema } from "../utils/YupSchema";
import { Link } from 'react-router-dom';
import { toast } from "react-toastify";

const fieldLabels = {
  numeroSerie: "Número de Série",
  ip: "IP",
  padrao_id: "Padrão",
  codigoLocadora: "Código da Locadora",
  contadorInstalacao: "Contador de Instalação",
  dataInstalacao: "Data de Instalação",
  contadorRetiradas: "Contador de Retirada",
  dataContadorRetirada: "Data de Retirada",
  ultimoContador: "Último Contador",
  dataUltimoContador: "Data do Último Contador",
  unidadePai: "Unidade Pai",
  unidadeId: "Unidade Filho",
};

export default function RegisterPrinterForm() {
  const [unidades, setUnidades] = useState([]);
  const [padroes, setPadroes] = useState([]);
  const [unidadeInList, setUnidadeInList] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [dataUnidades, dataPadrao] = await Promise.all([
        getUnidades(),
        getPadroes(),
        getUsers()
      ]);
      
      if (dataUnidades.type ==='success' && dataUnidades.data) {
        setUnidades(dataUnidades.data);
      }

      if (dataPadrao.type ==='success' && dataPadrao.data) {
        setPadroes(dataPadrao.data);
      }
    } catch (error) {
      console.error('Erro ao obter opções do serviço:', error);
    }
  };

  const handleWorkstationChange = (event) => {
    const selectedUnit = unidades.find(uni => uni.id === event.target.value) || {};
    setUnidadeInList(selectedUnit.child_workstations || []);
  };

  const registerPrinterSchema = getPrinterSchema(fieldLabels);
  const { register, handleSubmit, formState: { errors, isValid, isSubmitting }, reset } = useForm({
    resolver: yupResolver(registerPrinterSchema),
    mode: "onChange",
  });

  const onSubmit = async (data) => {
    const transformedData = transformData(data);
    const response = await createImpressora(transformedData);
    if (response.type === "success") {
      toast.success("Impressora criada com sucesso!");
      reset();
    } else {
      toast.error("Erro ao criar impressora! Por favor, tente novamente.");
    }
  };

  const transformData = (data) => {
    return {
      ...data,
      dataInstalacao: new Date(data.dataInstalacao).toISOString(),
      dataContadorRetirada: new Date(data.dataContadorRetirada).toISOString(),
      dataUltimoContador: new Date(data.dataUltimoContador).toISOString()
    };
  };

  const renderInputField = (key, label) => {
    // Lógica de renderização do campo de entrada
  };
  return (
    <div id="registerPrinter-card">
      <header id="form-header">Cadastrar impressora</header>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div id="input-group">
          {Object.entries(fieldLabels).map(([key, label]) => (
            <div id="input-line" key={key}>
              <div id="input-box">
                <label>
                  {label.charAt(0).toUpperCase() + label.slice(1)}
                  <span>*</span>
                </label>
                {key === "padrao_id" ? (
                  <select {...register(key)}>
                    <option value="">Selecione padrão</option>
                    {padroes.map(option => (
                      <option key={option.id} value={option.id}>
                        {option.tipo}, {option.marca}, {option.modelo}
                      </option>
                    ))}
                  </select>
                ) : key === "unidadePai" ? (
                  <select onChange={handleWorkstationChange}>
                    <option value="">Selecione a unidade pai</option>
                    {unidades.map(option => (
                      <option key={option.id} value={option.id}>
                        {option.name}
                      </option>
                    ))}
                  </select>
                ) : key === "unidadeId" ? (
                  <select {...register(key)}>
                    <option value="">Selecione a unidade filho</option>
                    {unidadeInList.map(option => (
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
          ))}
        </div>
        <div id="buttons">
          <button className="form-button" type="button" id="cancelar-bnt">
            <Link to="/">
              CANCELAR
            </Link>
          </button>
          <button className="form-button" type="submit" id="registrar-bnt" disabled={!isValid || isSubmitting} >
            {isSubmitting && (
              <ReloadIcon id="animate-spin"/>
            )}
            {!isSubmitting ? 'REGISTRAR': "CADASTRANDO"}
          </button>
        </div>
      </form>
      <div className="elipse-signup">
        <img alt="elipse" src={elipse6} />
      </div>
    </div>
  );
}

export { fieldLabels };

