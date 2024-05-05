export default function NodeContainer(props: any) {
    return <div style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-end',
        width: '100%',
        height: '100%',
        gap: '4px'
    }}>
        {props.children}
    </div>
}
