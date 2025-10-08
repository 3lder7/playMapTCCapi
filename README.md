# PlayMap ⚽🟧

## 📱 Passo a Passo para Executar o PlayMap

Este guia fornece instruções sobre como configurar e executar o projeto PlayMap, que é um aplicativo desenvolvido com React Native e Expo.

---

## Pré-requisitos

- **Node.js**: Certifique-se de que o Node.js está instalado em sua máquina. Você pode baixar a versão mais recente em [nodejs.org](https://nodejs.org/).
- **npm**: O npm é instalado automaticamente com o Node.js. Verifique a instalação com o comando:
```
npm --version
```

## 🛠️ Configurando o projeto
1. Clone o repositório
```
git clone https://github.com/seu-usuario/playMapTCCapi-main.git
cd playMapTCCapi-main
```
2. Instale as dependências
```
npm install
```
2.2 Se ocorrerem erros de dependências:
```
npm install --legacy-peer-deps
``` 
### 🔥 Configuração do Firebase

Certifique-se de que as credenciais do Firebase estão corretas no arquivo firebaseConfig.js.

## 🚀 Executando o projeto

1. Inicie o servidor
```
npx expo start
```

2. Executar versão web

  **Para iniciar a versão web: pressione 'W' no terminal e aguarde a mensagem "web compiled successfully".**

3. Para executar diretamente no celular (mais conselhável)
```
npx expo start --tunnel
```

4. Certifique-se de ter o aplicativo 'Expo Go' instalado no celular.
5. Escaneie o QR Code gerado no terminal.

## 🤝 Contribuições
Sinta-se à vontade para contribuir! Basta fazer um fork do repositório, criar uma nova branch com sua funcionalidade ou correção e abrir um pull request. 🚀

---
