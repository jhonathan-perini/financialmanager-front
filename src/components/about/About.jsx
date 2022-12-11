import house from '../../assets/about/house.png'

export default function About(){
    return (
        <div className="about__container">
            <div>
                <div>
                    <img src={house} alt="pink monster showing your tongue with three eyes" className="about__image"/>
                </div>
                <div>
                <p>Hey!</p>
                <p>Thank you for supporting our application.</p>
                <p>Its purpose is to be a seasonal themed app adapting in response for some holiday</p>
                <p><br/>We hope you enjoy</p>
                <p>See you soon</p>
                </div>

            </div>
        </div>
    )
}