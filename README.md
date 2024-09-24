# Weather App

Este é um simples aplicativo de previsão do tempo que utiliza a API do OpenWeatherMap para exibir informações meteorológicas em tempo real para uma cidade específica. O aplicativo permite ao usuário buscar a previsão do tempo atual e a previsão para os próximos dias, além de mostrar o horário local da cidade selecionada.

## Funcionalidades

- Busca por cidade para obter a previsão do tempo atual.
- Exibe a temperatura, condições climáticas, e o ícone do tempo atual.
- Mostra a previsão do tempo para os próximos dias.
- Exibe o horário local da cidade selecionada.
- Mensagens de erro amigáveis caso a cidade não seja encontrada ou haja problemas na busca dos dados.

## Pré-requisitos

- Uma chave de API válida do [OpenWeatherMap](https://openweathermap.org/).
- Conexão com a internet para buscar os dados meteorológicos.

## Como Usar

1. Clone o repositório ou faça o download dos arquivos.
2. Substitua a chave de API (`apiKey`) no arquivo JavaScript pela sua própria chave obtida no site do OpenWeatherMap.
3. Abra o arquivo `index.html` em seu navegador.
4. Digite o nome de uma cidade no campo de busca e clique em "Buscar".
5. A previsão do tempo atual, bem como a previsão para os próximos dias, será exibida junto com o horário local da cidade.

## Estrutura do Código

- **fetchWeather(city)**: Função assíncrona que busca os dados do tempo e da previsão para a cidade informada. Em caso de sucesso, as funções `updateWeatherUI` e `updateForecastUI` são chamadas para atualizar a interface do usuário. Caso contrário, exibe uma mensagem de erro.
- **showError(message)**: Exibe mensagens de erro na interface do usuário.
- **updateWeatherUI(data)**: Atualiza a interface com os dados do tempo atual, incluindo a cidade, temperatura, descrição do clima, e ícone do tempo.
- **updateForecastUI(data)**: Atualiza a interface com a previsão do tempo para os próximos dias.
- **updateLocalTime(timezone)**: Atualiza o horário local da cidade selecionada com base no fuso horário.

## Tecnologias Utilizadas

- **HTML**: Estrutura básica da página.
- **CSS**: Estilização da interface do usuário.
- **JavaScript**: Manipulação do DOM e chamada à API do OpenWeatherMap.

## API

Este projeto utiliza a API do OpenWeatherMap para obter os dados meteorológicos. Para mais informações, consulte a [documentação da API](https://openweathermap.org/api).

## Licença

Este projeto está licenciado sob a Licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

