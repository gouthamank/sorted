import type {HeaderProps} from "@/types/components/Header/index.types";

export default function Header(props: HeaderProps) {
    return <div style={{
        display: 'flex',
        gap: '5rem',
        fontSize: '2rem',
        justifyContent: 'space-between',
        height: '10rem',
        padding: '0 2rem',
    }}>
        <button onClick={props.onRandomiseClicked}>Randomise</button>

        <button onClick={props.onSortClicked}>Sort</button>
    </div>
}