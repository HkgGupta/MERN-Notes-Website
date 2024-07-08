
const FeatureCard = (props) => {
    return (
        <div>
            <div className="image">
                <img src="https://images.unsplash.com/photo-1488274319148-051ed60a9404?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&ixid=M3w0OTA1NzB8MHwxfHNlYXJjaHw0fHxDcmVhdGUlMkNOb3RlfGVufDB8fHx8MTcxOTAzMTg3NXww&ixlib=rb-4.0.3&q=80&w=1080?w=800&h=450&utm_source=PopAi&utm_medium=referral" alt="f1" />
            </div>
            <h3 className="title"><b>{props.title}</b></h3>
            <p className="desc">{props.desc}</p>
        </div>
    );
};

export default FeatureCard;