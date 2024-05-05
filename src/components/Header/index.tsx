type HeaderProps = {
    onRandomiseClicked: () => void;
    onSortClicked: () => void;
}

export default function Header(props: HeaderProps) {
    return <div>
        <button onClick={props.onRandomiseClicked}>Randomise</button>

        <button onClick={props.onSortClicked}>Sort</button>
    </div>
}