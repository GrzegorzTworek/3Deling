# Zadanie rekrutacyjne 3Deling

Do wykonania zadania wykorzystano bibliotekę react-three-fiber (do tworzenia grafik) oraz bibliotekę @react-three/rapier do tworzenia fizyki i kolizji.

# Opis programu

Aby uruchomić program należy w pierwszej kolejności wpisać w terminalu "yarn add @react-three/rapier", a następnie "npm start". 
Wewnątrz komponentu App jest zdefiniowany (<Canvas>) z czarnym tłem, oświetlony jednym światłem ambientowym i jednym światłem punktowym. W Canvasie jest zdefiniowany obiekt (RigidBody) z siatką w kształcie pierścienia (<mesh>) (<ringGeometry>) w kolorze czerwonym (<meshBasicMaterial>), oraz fizyką (<Physics>) z grawitacją skierowaną w dół o wartości -5. Później znajduję się zestaw kulek. Kule są generowane jako 20 instancji komponentu Ball przy użyciu metody Array.from. 
Komponent Ball reprezentuje pojedynczą kulke, która jest obiektem fizycznym w symulacji. Kulka jest zdefiniowana jako RigidBody z masą równą 1, posiada sferyczną geometrię z 16 segmentami i materiał standardowy. Kulka ma również przypisaną funkcję onCollisionEnter, która jest wywoływana w momencie wejścia w kolizję.

# Napotkane problemy
Program nie jest zbyt skomplikowany pod względem wykonania, zdecydowaną większość czasu zajęła nauka i poszukiwanie informacji o bibliotekach fiber i rapier. Wizualizacja ma też swoje wady, przy większej ilości kulek bądź żle dobranych parametrach zderzenia mogą następować wzdłuż osi z, a co za tym idzie kulki mogą wypadać poza okręg.
