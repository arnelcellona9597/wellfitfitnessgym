import{X as o,r as c,j as e}from"./app-CMSVI-JE.js";import{A as m,a as l,b as p,c as h}from"./Footer-SRM8ah-O.js";import{h as n}from"./moment-C5S46NFB.js";import"./Helmet-CMBpA21e.js";const x=()=>{const{get_membership_by_id:t}=o().props,r=c.useRef(null),a=()=>{const d=r.current.innerHTML,s=document.createElement("iframe");s.style.position="absolute",s.style.width="0",s.style.height="0",s.style.border="none",document.body.appendChild(s);const i=s.contentDocument||s.contentWindow.document;i.open(),i.write(`
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
          ${d}
        </body>
      </html>
    `),i.close(),s.contentWindow.focus(),s.contentWindow.print(),setTimeout(()=>{document.body.removeChild(s)},1e3)};return e.jsxs("div",{className:"col-lg-4",children:[e.jsxs("div",{className:"card shadow-sm",children:[e.jsx("div",{className:"card-header bg-primary text-white text-center",children:t.status=="Approved"?e.jsx("h5",{className:"mb-0",children:"Membership Confirmation"}):e.jsx("h5",{className:"mb-0",children:"Membership Request"})}),e.jsx("div",{className:"card-body p-0 m-0 ",children:e.jsxs("div",{ref:r,className:"receipt-container p-3 border rounded",children:[e.jsxs("div",{className:"receipt-header text-center",children:[t.status=="Approved"?e.jsx("h5",{className:"mb-0",children:"Thank you for subscribing to our gym membership."}):e.jsx("h5",{className:"mb-0",children:"Please sunmit receipt to the gym staff and pay."}),e.jsxs("h2",{className:"text-dark fw-bold",children:["Receipt #",t.id]})]}),e.jsxs("div",{className:"receipt-body mt-3 text-center",children:[e.jsx("hr",{}),e.jsxs("div",{className:"details",children:[e.jsxs("p",{className:"mb-1",children:[e.jsx("strong",{children:"Customer Name:"})," ",t.first_name," ",t.last_name]}),e.jsxs("p",{className:"mb-1",children:[e.jsx("strong",{children:"Plan:"})," ",t.plan_name]}),e.jsxs("p",{className:"mb-1",children:[e.jsx("strong",{children:"Duration:"})," ",t.plan_duration]}),e.jsxs("p",{className:"mb-1",children:[e.jsx("strong",{children:"Avail Date:"})," ",n(t.start_date).format("MMMM D, YYYY")]}),e.jsxs("p",{className:"mb-1",children:[e.jsx("strong",{children:"Valid Until:"})," ",n(t.end_date).format("MMMM D, YYYY")]}),e.jsxs("p",{className:"mb-1",children:[e.jsx("strong",{children:"Payment Method:"})," ",t.payment_method]}),e.jsxs("p",{className:"mb-1",children:[e.jsx("strong",{children:"Membership Status:"})," ",e.jsx("span",{className:"badge bg-success",children:t.status})]}),e.jsxs("p",{className:"fw-bold fs-5 text-primary",children:[e.jsx("strong",{children:"Amount Paid:"})," ₱",t.plan_price]})]}),e.jsx("hr",{}),e.jsx("p",{className:"text-muted mt-3",children:"Enjoy unlimited gym access with top-quality equipment, hot & cold showers, cold filtered drinking water, free WiFi, and professional, friendly staff. Stay fit today!"}),e.jsxs("button",{className:"btn btn-primary btn-sm no-print",onClick:a,children:[e.jsx("i",{className:"bi bi-printer"})," Print Receipt"]})]})]})})]}),e.jsx("style",{jsx:!0,children:`

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
      `})]})};function u(){return e.jsxs(e.Fragment,{children:[e.jsx(m,{}),e.jsx(l,{}),e.jsx(p,{}),e.jsxs("main",{id:"main",className:"main",children:[e.jsxs("div",{className:"pagetitle",children:[e.jsx("h1",{children:"View Membership Details"}),e.jsx("nav",{children:e.jsxs("ol",{className:"breadcrumb",children:[e.jsx("li",{className:"breadcrumb-item",children:e.jsx("a",{href:"#",children:"Home"})}),e.jsx("li",{className:"breadcrumb-item active",children:"View Membership Details"})]})})]}),e.jsx("section",{className:"section dashboard",children:e.jsx(x,{})})]}),e.jsx(h,{})]})}export{u as default};
