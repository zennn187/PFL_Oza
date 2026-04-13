export default function Container({children}){
    return(
        <div className="card-container">
            <h1>BIODATA DIRI</h1>
            <br/>
                {children}
            <br/>
            <footer>
                <p>2025 - Politeknik Caltex Riau</p>
            </footer>
        </div>
    )
}