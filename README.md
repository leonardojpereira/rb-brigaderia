
# Portal RB Brigaderia - Frontend 🍫

---

## 📋 Descrição do projeto

Este projeto é o frontend do portal RB Brigaderia, desenvolvido para gerenciar vendas, estoque e outras operações da brigaderia. A aplicação é construída utilizando **Angular** e fornece uma interface moderna e responsiva para interagir com a [API RB Brigaderia](https://github.com/leonardojpereira/rb-brigaderia-api).

---

## 🛠️ Feito com

- <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/angularjs/angularjs-original.svg" alt="logo_angular" width="30"/> **Angular**: Framework para criação de aplicações frontend modernas.
- <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg" alt="logo_typescript" width="30"/> **TypeScript**: Linguagem principal utilizada para desenvolvimento.
- <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" alt="logo_javascript" width="30"/> **JavaScript**: Base para lógica de interatividade.
- <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/materialui/materialui-original.svg" alt="logo_material" width="30"/> **Angular Material**: Biblioteca para criar interfaces de usuário elegantes e responsivas.

---

## ⚙️ Funcionalidades

### Componentes principais
- **Login**: Sistema de autenticação para usuários da plataforma.
- **Dashboard**: Painel de resumo com visualização de métricas de vendas e estoque.
- **Gestão de Estoque**: Controle de entradas e saídas de produtos.
- **Gestão de Vendas**: Interface para cadastro e visualização de vendas realizadas.
- **Métricas e Relatórios**: Gráficos e relatórios interativos para análise de dados.

### Destaques técnicos
- Reutilização de componentes: Layouts, tabelas customizadas, botões e inputs.
- Utilização de interceptors para manipulação de requisições HTTP e autenticação.
- Gráficos interativos com **Ngx-Charts**.

---

## 💻 Estrutura do projeto

O projeto segue a estrutura de módulos do Angular. Alguns dos componentes e páginas incluem:
- **Páginas**:
  - `LoginComponent`: Tela de login.
  - `HomeComponent`: Página inicial.
  - `EstoquePageComponent`: Página de gestão de estoque.
  - `VendasPageComponent`: Página de vendas.
  - `ResumoPageComponent`: Resumo com gráficos e métricas.
- **Componentes**:
  - `AuthComponent`: Componente de autenticação.
  - `CustomTableComponent`: Tabela customizável para exibição de dados.
  - `LoaderComponent`: Indicador de carregamento.
  - `ModalComponent`: Modal genérico para confirmações e notificações.

---

## :electric_plug: Instalação e Uso

Siga as instruções abaixo para configurar e executar o projeto em sua máquina:

1. Clone este repositório:
   ```bash
   git clone https://github.com/seu-usuario/seu-repositorio-frontend.git
   ```

2. Instale as dependências do projeto:
   ```bash
   npm install
   ```

3. Inicie o servidor de desenvolvimento:
   ```bash
   npm start
   ```

4. Acesse a aplicação no navegador:
   ```
   http://localhost:4200
   ```

---

## 🔐 Autenticação

O frontend utiliza tokens JWT para autenticação com a [API RB Brigaderia](https://github.com/leonardojpereira/rb-brigaderia-api). As requisições autenticadas incluem o token no cabeçalho da seguinte forma:
```
Authorization: Bearer <seu-token-jwt>
```

---

## :link: Tecnologias e Dependências

- **Angular CLI**: Ferramenta de linha de comando para desenvolvimento Angular.
- **Angular Material**: Componentes de UI para criação de interfaces responsivas.
- **Ngx-Charts**: Biblioteca para criação de gráficos interativos.

---

## 📊 Scripts disponíveis

- `npm start`: Inicia o servidor de desenvolvimento.
- `npm run build`: Gera o build de produção da aplicação.
- `npm run test`: Executa os testes unitários.

---

## ⌨️ Desenvolvido por

**Leonardo Barbosa de Jesus Pereira**  
[LinkedIn](https://www.linkedin.com/in/leonardojpereira) | [Portfólio](https://leonardobarbosaportfolio.netlify.app/) 😊

---

### :construction: PROJETO FINALIZADO :construction:
