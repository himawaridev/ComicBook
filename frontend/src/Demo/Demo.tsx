// import Image from "next/image";
// import Link from 'next/link';
// import { useState, useEffect } from 'react';
// import axios from "axios";

// const Demo: React.FC = () => {
//     const [Demo, setDemo] = useState<string>([]);

//     useEffect(() => {
//         axios.get('http://localhost:2000/truyen-tien-hiep')
//             .then(response => {
//                 console.log("[Data DaddyJuiceProductCpn: ]", response);
//                 if (response.data) {
//                     setDemo(response.data.DaddyJuiceData);
//                 }
//             })
//             .catch((err) => console.log("Error: ", err.message));
//     }, []);
//     const RenderDemo = () => {
//         const DemoList = Demo.map((item, index) => {
//             return (
//                 <div></div>
//             )
//         })
//     }
//     return (
//         <div>

//         </div>
//     );
// }
// export default Demo;