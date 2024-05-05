export default function Node(props: any) {
    return <div style={{
        background: props.state.isHighlighted ? 'blue' : 'grey',
        height: `${props.state.value}px`,
        width: '2px'}}
    />;
}