export type ImageName = "Apple TV"
    | "Blu-ray"
    | "PlayStation"
    | "PC"
    | "Xbox"
    | "TV"
    | "Initial Image";

type Image = {
    name: ImageName,
    image: any
}
  
export default class InputImageBackgrounds {
    private static images: Array<Image> = [
      {
        name: 'Apple TV',
        image: require('./appleTvLogo.png'),
      },
      {
        name: 'Blu-ray',
        image: require('./blurayIcon.png'),
      },
      {
        name: 'PlayStation',
        image: require('./playstationLogo.png'),
      },
      {
        name: 'PC',
        image: require('./PC.png'),
      },
      {
        name: 'Xbox',
        image: require('./xbox.png'),
      },
      {
        name: 'TV',
        image: require('./TV.png'),
      },
      {
        name: 'Initial Image',
        image: require('./initialImage.png')
      }
    ];
  
    static GetImage = (name: ImageName) => {
      const found = InputImageBackgrounds.images.find(e => e.name === name);
      return found ? found.image : null;
    };
}