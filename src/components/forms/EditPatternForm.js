import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from 'react-router-dom';
import "../../style/components/printerPatternForm.css";
import elipse6 from "../../assets/elipse6.svg";
import { getRegisterPatternSchema } from "../utils/YupSchema";
import { editPadrao } from "../../services/printerService";
import { toast } from "react-toastify";

const fieldLabels = {
  tipo: "Tipo",
  marca: "Marca",
  modelo: "Modelo",
  snmp: {
    modeloImpressora: "Modelo da impressora",
    numeroSerie: "Número de série",
    versaoFirmware: "Versão do Firmware",
    tempoAtivoSistema: "Tempo ativo do sistema",
    totalDigitalizacoes: "Total de digitalizações",
    totalCopiasPB: "Total de cópias P&B",
    totalCopiasColoridas: "Total de cópias coloridas",
    totalImpressoesPb: "Total de impressões P&B",
    totalImpressoesColoridas: "Total de impressões coloridas",
    totalGeral: "Total geral",
    enderecoIp: "Endereço IP",
  },
};

export default function EditPatternForm() {

  const { padrao } = useParams();
  
  const pattern = JSON.parse(atob(padrao));
  console.log(pattern);
  
  const navigate = useNavigate();
  const registerPrinterSchema = getRegisterPatternSchema(fieldLabels);
  
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(registerPrinterSchema),
    mode: "onSubmit",
  });

  const onSubmit = async (data) => {
    console.log(data);
    
    const response = await editPadrao(data);
    if (response.type === "success") {
      toast.success("Padrão editado com sucesso!");
      setTimeout(() => {
        navigate("/padroescadastrados");
      }, 1000);
    } else {
       toast.error("Erro ao editar o padrão!");
    }
    
  };

  useEffect(() => {
    Object.entries(pattern).forEach(([key, value]) => {
      setValue(key, value);
    });
  }, [setValue]);
  
  return (
    <div id="printer-pattern-signup-card" data-testid="printer-pattern-signup-card">
      <h2 id="printer-pattern-form-header">Edição de padrão de impressora</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div id="printer-pattern-input-group">
          <div id="printer-pattern-input-box">
            <div id="printer-pattern-fields">
              {Object.entries(fieldLabels).filter(([key]) => key !== "snmp").map(([key, label]) => (
                <div id="printer-pattern-input-line" key={key}>
                  <label>
                    {label}
                    <span>*</span>
                  </label>
                  <input
                    {...register(key)}
                    placeholder={`Digite ${label.toLowerCase()}`}
                  />
                  <span>{errors[key]?.message}</span>
                </div>
              ))}
            </div>

            <div id="printer-pattern-snmp-fields">
              <label htmlFor="snmp">SNMP</label>
              {Object.entries(fieldLabels.snmp).map(([key, label]) => (
                <div id="snmp-fields-input-line" key={key}>
                  <label>
                    {label}
                    <span>*</span>
                  </label>
                  <input
                    {...register(key)}
                    placeholder="Código OID"
                  />
                  <span>{errors[key]?.message}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div id="printer-pattern-buttons">
          <button className="printer-pattern-form-button" type="button" id="cancelar-bnt">
            <Link to="/padroescadastrados">
              CANCELAR
            </Link>
          </button>
          <button
            className="printer-pattern-form-button"
            type="submit"
            id="registrar-bnt"
            disabled={isSubmitting}
          >
            SALVAR
          </button>
        </div>
      </form>
      <div className="elipse-pattern">
        <img alt="elipse" src={elipse6} />
      </div>
    </div>
  );
}
