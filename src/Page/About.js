import React from 'react';


function About() {
    return (
        <table style={{borderCollapse: 'collapse', margin: 16}} border="0">
            <tbody>
                <tr>
                    <td style={{borderColor: '#34495e', 'borderStyle': 'solid', borderWidth: '0px 0px 0px 8px', paddingLeft:16}}>
                        <div><b>Personal ePortfolio System</b></div>
                        <div>University of Melbourne / Team 12 / May 2020</div>
                        <div>Backend:</div>
                        <div>Xuefeng Chen xuefeng#student.unimelb.edu.au</div>
                        <div>Frontend:</div>
                        <div>Yiyang&nbsp;XU&nbsp;yiyangx2#student.unimelb.edu.au</div>
                        <div>Shang Gao gasg#student.unimelb.edu.au</div>
                        <div>Chang Liu liu.c5#student.unimelb.edu.au</div>
                        <div>Chuanxi Fu chuanxif#student.unimelb.edu.au</div>
                        <div>(Replace # with @)</div>
                    </td>
                </tr>
            </tbody>
        </table>
    );
}

export default About;