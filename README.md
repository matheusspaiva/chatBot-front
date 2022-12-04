# Procedimentos para rodar o projeto

## `npm install`
### - Instala todas as dependencias que o projeto tem

## `npm run start`
### - Executa de fato a interface do Chat bot


# Funcionamento

## Breve apresentação

Somos uma pequena empresa que vende aparelhos eltronicos e esse chatBot foi criado com o intuito de ajudar nossos clientes com algumas ferramentas que o bot disponibiliza

## Funções do chatBot

### 1 - Produtos
Retorna uma lista de produtos dispoivel no estabelecimento para vender mostrando as seguntes informações a identificação do produto , o nome dele e seu preço.
### 2 - Locais de venda
Retorna uma lista de todos os estabelecimentos para a retirada do produto.
### 3 - Qual seu nome?
Retorna o nome do ChatBot.
### 4 - comprar 
Inicia o processo de compras do produtos.
### 5 - Historico de compras
Registra todas as compras feita pelo usuario, informando o valor total da compra, local da retirada e a data. 
### 6 - Quem somos nós
Retorna uma breve informação sobre a loja
### 7 - Entre em contato
Ultilizamos uma api para realizar a integração q vai ser feita por whatsApp 
A api em questão é a `https://api.whatsapp.com/send?phone=NUMBER&text=TEXT_SEND` onde o `NUMBER` é o numero em que vai se mandar a mensagem e o `TEXT_SEND` é o conteudo da mensagem 
Vale relembrar que por motivos de segurança quando o numero é chamado do back para o front ele sofre uma encriptação
