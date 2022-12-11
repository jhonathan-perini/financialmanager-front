export default function Dialog({children, dialogState, header, cancelAction, confirmAction}){

    return (
        <section className={dialogState.dialog ? "dialog open" : "dialog"}>
            <div className="dialog__header">{header}</div>
            <div className="dialog__content">
                {children ? children : null}
            </div>
            <div className="dialog__footer">
                <a  className=" login__button cancel__button" onClick={cancelAction}>Cancel</a>
                <a  className=" login__button confirm__button" onClick={confirmAction}>Confirm</a>
            </div>
        </section>
    )
}