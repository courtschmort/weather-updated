export class GiphyService {
  async getGifByHumidity(humidity) {
    try {
      let response = await fetch(`http://api.giphy.com/v1/gifs/search?api_key=${process.env.giphyKey}&q=${humidity}&limit=5`);
      let jsonifiedResponse = await response.json();
      return jsonifiedResponse;
    } catch(error) {
      console.error("There was an error handling your request: " + error.message);
    }
  }
}
