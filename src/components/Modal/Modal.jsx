import React, { useContext, useEffect, useState } from "react";
import { Container, ModalContent, ModalActions, ModalDivider } from "./Styles";
import { FormContext } from "../../contexts/FormContext";
import Card from "../Card/Card";
import { ToastContainer, toast } from "react-toastify";
import {
  ButtonContainer,
  FormContainer,
} from "../../pages/ProdutosEntrada/Styles";
import { InputField, SelectField } from "../Form/Form";
import Button from "../Button/Button";
import api from "../../services/api";

const Modal = ({ onConfirm, onCancel }) => {
  return (
    <Container>
      <ModalContent>
        <h2>Confirmação de Exclusão</h2>
        <p>Tem certeza que deseja excluir itens selecionados?</p>
        <ModalDivider />
        <ModalActions>
          <button onClick={onConfirm}>Confirmar</button>
          <button onClick={onCancel}>Cancelar</button>
        </ModalActions>
      </ModalContent>
    </Container>
  );
};

/* MODAL DE EDIÇÃO ENTRADAS */
const ModalEditEntradas = ({ item, onClose }) => {
  const { fornecedorData, handleChange } = useContext(FormContext);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [suppliers, setSuppliers] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/fornecedores");
        setSuppliers(response.data);
      } catch (error) {
        console.error("Erro ao buscar fornecedor:", error);
        toast.error("Erro ao buscar fornecedores.");
      }
    };

    fetchData();
  }, []);

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    handleChange(e, "entrada");
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: value ? "" : prevErrors[name],
    }));
  };

  const validateFields = () => {
    // Função de validação de campos (adicionar suas regras de validação aqui)
    return true;
  };

  const handleSubmit = async () => {
    if (!validateFields()) {
      toas;
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await api.put(
        `/entradas/${entradaData.id}`,
        entradaData
      );
      console.log("Item atualizado:", response.data);
      toast.success("Item atualizado com sucesso!");
      onClose();
    } catch (error) {
      console.error("Erro ao atualizar item:", error);
      toast.error("Erro ao atualizar entrada.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container>
      <Card title={"Editar Entradas"} icon={"bi bi-download"}>
        <ToastContainer />
        <FormContainer>
          <InputField
            label={"Produto"}
            name={"produto"}
            value={entradaData.produto || ""}
            onChange={handleFieldChange}
          />
          <InputField
            label={"Quantidade"}
            name={"quantidade"}
            value={entradaData.quantidade || ""}
            onChange={handleFieldChange}
          />
          <SelectField
            label={"Fornecedor"}
            name={"fornecedor"}
            value={entradaData.fornecedor || ""}
            onChange={handleFieldChange}
          >
            <option value="" disabled>
              Selecione
            </option>
            {suppliers.map((supplier, index) => (
              <option key={index} value={supplier.nome}>
                {supplier.nome}
              </option>
            ))}
          </SelectField>
          <InputField
            label={"Data de Entrada"}
            name={"data_entrada"}
            type={"date"}
            value={entradaData.data_entrada || ""}
            onChange={handleFieldChange}
          />
          <InputField
            label={"Número de Lote"}
            name={"numero_lote"}
            value={entradaData.numero_lote || ""}
            onChange={handleFieldChange}
          />
          <InputField
            label={"Preço de Compra"}
            name={"preco_compra"}
            type={"number"}
            value={entradaData.preco_compra || ""}
            onChange={handleFieldChange}
          />
        </FormContainer>
        <ButtonContainer>
          <Button
            label={"Atualizar"}
            onClick={handleSubmit}
            disabled={isSubmitting}
          />
          <Button
            label={"Cancelar"}
            onClick={onClose}
            disabled={isSubmitting}
          />
        </ButtonContainer>
      </Card>
    </Container>
  );
};

/* MODAL DE EDIÇÃO PRODUTOS */
const ModalEditProdutos = ({ item, onClose }) => {
  const { produtoData, handleChange } = useContext(FormContext);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [suppliers, setSuppliers] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/fornecedores");
        setSuppliers(response.data);
      } catch (error) {
        console.error("Erro ao buscar fornecedor:", error);
        toast.error("Erro ao buscar fornecedores.");
      }
    };

    fetchData();
  }, []);

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    handleChange(e, "produto");
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: value ? "" : prevErrors[name],
    }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const response = await api.put(
        `/produtos/${produtoData.id}`,
        produtoData
      );
      console.log("Item atualizado:", response.data);
      toast.success("Item atualizado com sucesso!");
      onClose();
    } catch (error) {
      console.error("Erro ao atualizar item:", error);
      toast.error("Erro ao atualizar entrada.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container>
      <Card title={"Editar Produtos"} icon={"bi bi-download"}>
        <ToastContainer />
        <FormContainer>
          <InputField
            label={"Nome"}
            name={"nome"}
            value={produtoData.nome || ""}
            onChange={handleFieldChange}
          />
          <InputField
            label={"Categoria"}
            name={"categoria"}
            value={produtoData.categoria || ""}
            onChange={handleFieldChange}
          />
          <SelectField
            label={"Fornecedor"}
            name={"fornecedor"}
            value={produtoData.fornecedor || ""}
            onChange={handleFieldChange}
          >
            <option value="" disabled>
              Selecione
            </option>
            {suppliers.map((supplier, index) => (
              <option key={index} value={supplier.fornecedor}>
                {supplier.nome}
              </option>
            ))}
          </SelectField>
          <InputField
            label={"Marca"}
            name={"marca"}
            value={produtoData.marca || ""}
            onChange={handleFieldChange}
          />
        </FormContainer>
        <ButtonContainer>
          <Button
            label={"Atualizar"}
            onClick={handleSubmit}
            disabled={isSubmitting}
          />
          <Button
            label={"Cancelar"}
            onClick={onClose}
            disabled={isSubmitting}
          />
        </ButtonContainer>
      </Card>
    </Container>
  );
};

/* MODAL DE EDIÇÃO RETIRADAS */
const ModalEditRetiradas = ({ item, onClose }) => {
  const { retiradaData, handleChange } = useContext(FormContext);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    handleChange(e, "retirada");
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: value ? "" : prevErrors[name],
    }));
  };

  const validateFields = () => {
    return true;
  };

  const handleSubmit = async () => {
    if (!validateFields()) {
      toas;
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await api.put(
        `/retiradas/${retiradaData.id}`,
        retiradaData
      );
      console.log("Item atualizado:", response.data);
      toast.success("Item atualizado com sucesso!");
      onClose();
    } catch (error) {
      console.error("Erro ao atualizar item:", error);
      toast.error("Erro ao atualizar entrada.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container>
      <Card title={"Editar Retirada"} icon={"bi bi-upload"}>
        <ToastContainer />
        <FormContainer>
          <InputField
            label={"Produto"}
            name={"produto"}
            value={retiradaData.produto || ""}
            onChange={handleFieldChange}
          />
          <InputField
            label={"Quantidade"}
            name={"quantidade"}
            value={retiradaData.quantidade || ""}
            onChange={handleFieldChange}
          />
          <InputField
            label={"Tipo de Saída"}
            name={"tipo_retirada"}
            value={retiradaData.tipo_saida || ""}
            onChange={handleFieldChange}
          />
          <InputField
            label={"Data de Retirada"}
            name={"data_retirada"}
            type={"date"}
            value={retiradaData.data_retirada || ""}
            onChange={handleFieldChange}
          />
          <InputField
            label={"Número de Lote"}
            name={"numero_lote"}
            value={retiradaData.numero_lote || ""}
            onChange={handleFieldChange}
          />
        </FormContainer>
        <ButtonContainer>
          <Button
            label={"Atualizar"}
            onClick={handleSubmit}
            disabled={isSubmitting}
          />
          <Button
            label={"Cancelar"}
            onClick={onClose}
            disabled={isSubmitting}
          />
        </ButtonContainer>
      </Card>
    </Container>
  );
};

/* MODAL DE EDIÇÃO ENTRADAS */
const ModalEditFornecedores = ({ item, onClose }) => {
  const { fornecedorData, handleChange } = useContext(FormContext);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [suppliers, setSuppliers] = useState([]);
  const [errors, setErrors] = useState({});

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    handleChange(e, "fornecedor");
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: value ? "" : prevErrors[name],
    }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const response = await api.put(
        `/fornecedores/${fornecedorData.id}`,
        fornecedorData
      );
      console.log("Item atualizado:", response.data);
      toast.success("Item atualizado com sucesso!");
      onClose();
    } catch (error) {
      console.error("Erro ao atualizar item:", error);
      toast.error("Erro ao atualizar entrada.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container>
      <Card title={"Editar Fornecedores"} icon={"bi bi-truck"}>
        <ToastContainer />
        <FormContainer>
          <InputField
            label={"Nome"}
            name={"nome"}
            value={fornecedorData.nome || ""}
            onChange={handleFieldChange}
          />
          <InputField
            label={"CNPJ"}
            name={"cnpj"}
            value={fornecedorData.cnpj || ""}
            onChange={handleFieldChange}
            placeholder={"xx.xxx.xxx/0001-xx"}
          />
          <InputField
            label={"Telefone"}
            name={"telefone"}
            value={fornecedorData.telefone || ""}
            onChange={handleFieldChange}
            placeholder={"(xx)xxxx-xxxx"}
          />
          <InputField
            label={"Celular"}
            name={"celular"}
            value={fornecedorData.celular || ""}
            onChange={handleFieldChange}
            placeholder={"(xx)xxxxx-xxxx"}
          />
          <InputField
            label={"E-mail"}
            name={"email"}
            type={"email"}
            value={fornecedorData.email || ""}
            onChange={handleFieldChange}
            placeholder={"email@email.com"}
          />
          <InputField
            label={"Site"}
            name={"site"}
            value={fornecedorData.site || ""}
            onChange={handleFieldChange}
          />
          <InputField
            label={"CEP"}
            name={"cep"}
            value={fornecedorData.cep || ""}
            onChange={handleFieldChange}
            placeholder={"xx.xxx-xx"}
          />
          <InputField
            label={"Endereço"}
            name={"endereco"}
            value={fornecedorData.endereco || ""}
            onChange={handleFieldChange}
          />
          <InputField
            label={"Número"}
            name={"numero_endereco"}
            value={fornecedorData.numero_endereco || ""}
            onChange={handleFieldChange}
          />
          <InputField
            label={"Bairro"}
            name={"bairro"}
            value={fornecedorData.bairro || ""}
            onChange={handleFieldChange}
          />
          <InputField
            label={"Cidade"}
            name={"cidade"}
            value={fornecedorData.cidade || ""}
            onChange={handleFieldChange}
          />
          <InputField
            label={"UF"}
            name={"estado"}
            value={fornecedorData.estado || ""}
            placeholder={"ex: MG"}
            onChange={handleFieldChange}
          />
          <InputField
            label={"Banco"}
            name={"banco"}
            value={fornecedorData.banco || ""}
            onChange={handleFieldChange}
          />
          <SelectField
            label="Tipo de Conta"
            name={"tipo_conta"}
            value={fornecedorData.tipo_conta || ""}
            onChange={handleFieldChange}
          >
            <option value="">Selecione</option>
            <option value="Conta Poupança PF">Conta Poupança PF</option>
            <option value="Conta Poupança PJ">Conta Poupança PJ</option>
            <option value="Conta Corrente PF">Conta Corrente PF</option>
            <option value="Conta Corrente PJ">Conta Corrente PJ</option>
          </SelectField>
          <InputField
            label={"Conta"}
            name={"conta"}
            value={fornecedorData.conta || ""}
            onChange={handleFieldChange}
          />
          <InputField
            label={"Agência"}
            name={"agencia"}
            value={fornecedorData.agencia || ""}
            onChange={handleFieldChange}
          />
        </FormContainer>
        <ButtonContainer>
          <Button
            label={"Atualizar"}
            onClick={handleSubmit}
            disabled={isSubmitting}
          />
          <Button
            label={"Cancelar"}
            onClick={onClose}
            disabled={isSubmitting}
          />
        </ButtonContainer>
      </Card>
    </Container>
  );
};

export {
  Modal,
  ModalEditEntradas,
  ModalEditProdutos,
  ModalEditRetiradas,
  ModalEditFornecedores,
};