<!-- # Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify) -->

# Zadanie rekrutacyjne 3Deling

Do wykonania zadania wykorzystano bibliotekę react-three-fiber (do tworzenia grafik) oraz bibliotekę @react-three/rapier do tworzenia fizyki i kolizji.

# Opis programu

Aby uruchomić program należy w pierwszej kolejności wpisać w terminalu "yarn add @react-three/rapier", a następnie "npm start".
Wewnątrz komponentu App jest zdefiniowany (<Canvas>) z czarnym tłem, oświetlony jednym światłem ambientowym i jednym światłem punktowym. W Canvasie jest zdefiniowany obiekt (RigidBody) z siatką w kształcie pierścienia (<mesh>) (<ringGeometry>) w kolorze czerwonym (<meshBasicMaterial>), oraz fizyką (<Physics>) z grawitacją skierowaną w dół o wartości -5. Później znajduję się zestaw kulek. Kule są generowane jako 20 instancji komponentu Ball przy użyciu metody Array.from.
Komponent Ball reprezentuje pojedynczą kulke, która jest obiektem fizycznym w symulacji. Kulka jest zdefiniowana jako RigidBody z masą równą 1, posiada sferyczną geometrię z 16 segmentami i materiał standardowy. Kulka ma również przypisaną funkcję onCollisionEnter, która jest wywoływana w momencie wejścia w kolizję.

# Napotkane problemy

Program nie jest zbyt skomplikowany pod względem wykonania, zdecydowaną większość czasu zajęła nauka i poszukiwanie informacji o bibliotekach fiber i rapier. Wizualizacja ma też swoje wady, przy większej ilości kulek bądź żle dobranych parametrach zderzenia mogą następować wzdłuż osi z, a co za tym idzie kulki mogą wypadać poza okręg.
