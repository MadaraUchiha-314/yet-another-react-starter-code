import React from "react";
import {Hello} from "src/js/widgets/homepage/Hello.tsx";

/*
* CSS files go here.
*/
import "src/css/homepage.scss";

class HomePage extends React.Component {
    render() {
        return (
            <>
                <div className="homepage">
                    Hello World!
                </div>
                <Hello
                    compiler="LOL"
                    framework="NOICE"
                />
            </>
        );
    }
}

export default HomePage;
