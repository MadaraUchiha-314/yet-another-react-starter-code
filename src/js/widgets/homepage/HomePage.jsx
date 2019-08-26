import React from 'react';
import { Hello } from 'src/js/widgets/homepage/Hello.tsx';

/*
* CSS files go here.
*/
import 'src/css/homepage.scss';

const HomePage = () => (
  <>
    <div className="homepage">
      Hello World! ddasdasas
    </div>
    <Hello
      compiler="LOL"
      framework="NOICE"
    />
  </>
);

export default HomePage;
