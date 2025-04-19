import{X as d,r as c,j as e}from"./app-DrqDQnA4.js";import{A as l,a as p,b as m,c as x}from"./Footer-BrVKsOuM.js";import{h as i}from"./moment-C5S46NFB.js";import"./Helmet-DiVuuYDF.js";const h=()=>{const{get_booktrainer_by_id:t}=d().props,n=c.useRef(null),a=()=>{const o=n.current.innerHTML,s=document.createElement("iframe");s.style.position="absolute",s.style.width="0",s.style.height="0",s.style.border="none",document.body.appendChild(s);const r=s.contentDocument||s.contentWindow.document;r.open(),r.write(`
      <html>
        <head>
          <title>Print Receipt</title>
          <style>
            @media print {
              body {
                font-family: "Courier New", monospace;
                margin: 0;
                padding: 0;
                text-align: center;
                background: none;
              }
              .receipt-container {
                width: 300px;
                margin: auto;
                padding: 10px;
                border: 1px dashed #000;
                background: #fff;
                font-size: 12px;
                text-align: center;
              }
              .receipt-header {
                text-align: center;
                border-bottom: 1px dashed #000;
                padding-bottom: 5px;
                margin-bottom: 5px;
              }
              .receipt-header h5, .receipt-header h2 {
                margin: 2px 0;
              }
              .receipt-body {
                margin-top: 10px;
              }
              .receipt-body p {
                font-size: 12px;
                margin: 2px 0;
              }
              .receipt-footer {
                text-align: center;
                font-style: italic;
                margin-top: 10px;
                border-top: 1px dashed #000;
                padding-top: 5px;
              }
              .no-print {
                display: none;
              }
            }
          </style>
        </head>
        <body>
          ${o}
        </body>
      </html>
    `),r.close(),s.contentWindow.focus(),s.contentWindow.print(),setTimeout(()=>{document.body.removeChild(s)},1e3)};return e.jsxs("div",{className:"col-lg-4",children:[e.jsxs("div",{className:"card shadow-sm",children:[e.jsx("div",{className:"card-header bg-primary text-white text-center",children:t.status=="Approved"?e.jsx("h5",{className:"mb-0",children:"Tranor Booking Confirmation"}):e.jsx("h5",{className:"mb-0",children:"Booking Trainor Request"})}),e.jsx("div",{className:"card-body p-0 m-0 ",children:e.jsxs("div",{ref:n,className:"receipt-container p-3 border rounded",children:[e.jsxs("div",{className:"receipt-header text-center",children:[t.status=="Approved"?e.jsx("h5",{className:"mb-0",children:"Thank you for trusting our professional gym trainer."}):e.jsx("h5",{className:"mb-0",children:"Please sunmit receipt to the gym staff and pay."}),e.jsxs("h2",{className:"text-dark fw-bold",children:["Receipt #",t.id]})]}),e.jsxs("div",{className:"receipt-body mt-3 text-center",children:[e.jsx("hr",{}),e.jsxs("div",{className:"details",children:[e.jsxs("p",{className:"mb-1",children:[e.jsx("strong",{children:"Customer Name:"}),t.first_name,"  ",t.last_name]}),e.jsxs("p",{className:"mb-1",children:[e.jsx("strong",{children:"Trainor Name:"})," ",t.trainer_name]}),e.jsxs("p",{className:"mb-1",children:[e.jsx("strong",{children:"Duration:"}),t.trainer_duration]}),e.jsxs("p",{className:"mb-1",children:[e.jsx("strong",{children:"Training Session Start:"})," ",i(t.start_date).format("MMMM D, YYYY")]}),e.jsxs("p",{className:"mb-1",children:[e.jsx("strong",{children:"Training Session End:"})," ",i(t.end_date).format("MMMM D, YYYY")]}),e.jsxs("p",{className:"mb-1",children:[e.jsx("strong",{children:"Payment Method:"})," ",t.trainer_payment_method]}),e.jsxs("p",{className:"mb-1",children:[e.jsx("strong",{children:"Booking Status:"})," ",e.jsx("span",{className:"badge bg-success",children:t.trainer_status})]}),(t==null?void 0:t.trainer_status)==="Approved"&&e.jsxs("p",{className:"fw-bold fs-5 text-primary",children:[e.jsx("strong",{children:"Amount Paid:"})," ₱",parseInt(t.trainer_total_price).toLocaleString()]}),(t==null?void 0:t.trainer_status)==="Pending"&&e.jsxs("p",{className:"fw-bold fs-5 text-primary",children:[e.jsx("strong",{children:"Amount to pay:"})," ₱",parseInt(t.trainer_total_price).toLocaleString()]})]}),e.jsx("hr",{}),e.jsxs("button",{className:"btn btn-primary btn-sm no-print",onClick:a,children:[e.jsx("i",{className:"bi bi-printer"})," Print Receipt"]})]})]})})]}),e.jsx("style",{jsx:!0,children:`

        .p-0 {
            padding: 0 !important;
        }
        .m-0 {
            margin: 0 !important;
        }
        .no-print {
        margin-top: 15px;
        }
        .receipt-container {
          background: #fff;
          box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
        }
        .receipt-body hr {
          border: 1px dashed #ccc;
          margin: 10px 0;
        }
        .receipt-header h5 {
          font-size: 18px;
          font-weight: bold;
        }
        .receipt-header h2 {
          font-size: 22px;
          font-weight: bold;
          color: #333;
        }
        .receipt-body p {
          font-size: 14px;
          margin-bottom: 4px;
        }
        .receipt-footer {
          text-align: center;
          margin-top: 15px;
          border-top: 2px solid #ddd;
          padding-top: 10px;
        }
        .receipt-footer button {
          font-size: 14px;
        }
      `})]})};function f(){return e.jsxs(e.Fragment,{children:[e.jsx(l,{}),e.jsx(p,{}),e.jsx(m,{}),e.jsxs("main",{id:"main",className:"main",children:[e.jsxs("div",{className:"pagetitle",children:[e.jsx("h1",{children:"Bookings List"}),e.jsx("nav",{children:e.jsxs("ol",{className:"breadcrumb",children:[e.jsx("li",{className:"breadcrumb-item",children:e.jsx("a",{href:"#",children:"Home"})}),e.jsx("li",{className:"breadcrumb-item active",children:"List of all Bookings"})]})})]}),e.jsx("section",{className:"section dashboard",children:e.jsx(h,{})})]}),e.jsx(x,{})]})}export{f as default};
