import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { ReloadIcon } from "@radix-ui/react-icons";
import { toast } from "react-toastify";
import elipse6 from "../../assets/elipse6.svg";
import { createImpressora, getPadroes } from "../../services/printerService";
import { getUnidades } from "../../services/unidadeService";
import "../../style/components/registerPrinterForms.css";
import { getPrinterSchema } from "../utils/YupSchema";
import { getUsers } from "../../services/userService";

const fieldLabels = {
  padrao_id: "Padrão",
  ip: "IP",
  numeroSerie: "Número de Série",
  codigoLocadora: "Código da Locadora",
  contadorInstalacao: "Contador de Instalação",
  dataInstalacao: "Data de Instalação",
  contadorRetirada: "Contador de Retirada",
  dataRetirada: "Data de Retirada",
  ultimoContador: "Último Contador",
  dataUltimoContador: "Data do Último Contador",
  unidadePai: "Unidade Pai",
  unidadeFilho: "Unidade Filho",
};



export default function RegisterPrinterForm() {
  const [unidades, setUnidades] = useState([]);
  const [padroes, setPadroes] = useState([]);
  const [locadora, setLocadoras] = useState([]);
  const [unidadeInList, setUnidadeInList] = useState([]);
  
  useEffect( () => {
    async function setData() {
        try {
            const [dataUnidades, dataPadrao, dataUsers] = await Promise.all([
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
            if (dataUsers.type ==='success' && dataUsers.data) {
              const locadoras = dataUsers.data.filter(user => 
                user.cargos.includes("LOCADORA")
              );
              setLocadoras(locadoras);
            }

        } catch (error) {
            console.error('Erro ao obter opções do serviço:', error);
          }
    }
    setData();
  }, []);

  const handleWorkstationChange = (event) => {
    if (event.target.value) {
        const selectedUnit = unidades.find(uni => uni.id === event.target.value);
        if (selectedUnit) {
            const combinedList = [selectedUnit, ...selectedUnit.child_workstations];
            setUnidadeInList(combinedList);
        } else {
            setUnidadeInList([]);
        }
    } else {
        setUnidadeInList([]);
    }
  };

  const registerPrinterSchema = getPrinterSchema(fieldLabels);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
    reset,
  } = useForm({
    resolver: yupResolver(registerPrinterSchema),
    mode: "onChange",
  });

  const onSubmit = async (data) => {
    console.log(data);
    const response = await createImpressora(data);
    if (response.type === "success") {
      toast.success("Impressora criada com sucesso!");
      reset();
    } else {
      toast.error("Erro ao criar impressora! Por favor, tente novamente.");
    }
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
                {key === "codigoLocadora" ? (
                  <select {...register(key)}>
                    <option value="">Selecione locadora</option>
                    {locadora.map(option => (
                      <option key={option.id} value={option.id}>
                        {option.nome}
                      </option>
                    ))}
                  </select>
                ):key === "padrao_id" ? (
                  <select {...register(key)}>
                    <option value="">Selecione padrão</option>
                    {padroes.map(option => (
                      <option key={option.id} value={option.id}>
                        {option.tipo}, {option.marca}, {option.modelo}
                      </option>
                    ))}
                  </select>
                ) : key === "unidadePai" ? (
                  <select {...register(key)} onChange={handleWorkstationChange}>
                    <option value="">Selecione a unidade pai</option>
                    {unidades.map(option => (
                      <option key={option.id} value={option.id}>
                        {option.name}
                      </option>
                    ))}
                  </select>
                ) : key === "unidadeFilho" ? (
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
                    placeholder={
                      label.includes("data")
                        ? "DD/MM/AAAA"
                        : label.charAt(0).toUpperCase() + label.slice(1)
                    }
                  />
                )}
                <span>{errors[key]?.message}</span>
              </div>
            </div>
          ))}
        </div>
        <div id="buttons">
          <button className="form-button" type="button" id="cancelar-bnt">
            CANCELAR
          </button>
          <button className="form-button" type="submit" id="registrar-bnt" disabled={!isValid ||isSubmitting}>
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

