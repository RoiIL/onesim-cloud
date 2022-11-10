import "../styles/AppButton.css";

export const AppButton = (props) => {

    return (
        <div className="appButton" onClick={props.onClick}>
            <img
                src={props.src}
                variant="info"
                className="appImage"
                />
                <span className="appName">{props.name}</span>
        </div>
    );
};