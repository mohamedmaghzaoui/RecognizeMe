export const Classes = () => {
    return (
        <>
            <div>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Nom de la classe</th>
                            <th scope="col">Nombre d'apprenants</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">Chris</th>
                            <td>HTML tables</td>
                        </tr>
                        <tr>
                            <th scope="row">Dennis</th>
                            <td>Web accessibility</td>
                        </tr>
                        <tr>
                            <th scope="row">Sarah</th>
                            <td>JavaScript frameworks</td>
                        </tr>
                        <tr>
                            <th scope="row">Karen</th>
                            <td>Web performance</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    );
};