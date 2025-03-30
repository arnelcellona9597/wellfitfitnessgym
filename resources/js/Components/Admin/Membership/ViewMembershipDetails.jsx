import React, { useRef } from "react";

const ViewMembershipDetails = () => {
  const printRef = useRef(null);

  const printReceipt = () => {
    const printContent = printRef.current.innerHTML;
    const printFrame = document.createElement("iframe");
    printFrame.style.position = "absolute";
    printFrame.style.width = "0";
    printFrame.style.height = "0";
    printFrame.style.border = "none";

    document.body.appendChild(printFrame);
    const printDocument = printFrame.contentDocument || printFrame.contentWindow.document;

    printDocument.open();
    printDocument.write(`
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
          ${printContent}
        </body>
      </html>
    `);
    printDocument.close();

    printFrame.contentWindow.focus();
    printFrame.contentWindow.print();

    setTimeout(() => {
      document.body.removeChild(printFrame);
    }, 1000);
  };

  return (
    <div className="col-lg-4">
      <div className="card shadow-sm">
        <div className="card-header bg-primary text-white text-center">
          <h5 className="mb-0">Membership Confirmation</h5>
        </div>
        <div className="card-body p-0 m-0 ">
          <div ref={printRef} className="receipt-container p-3 border rounded">
            {/* Header */}
            <div className="receipt-header text-center">
              <p className="mb-1">Thank you for subscribing to our gym membership.</p>
              <h2 className="text-dark fw-bold">Receipt #60</h2>
            </div>

            {/* Body */}
            <div className="receipt-body mt-3 text-center">
              <hr />
              <div className="details">
                <p className="mb-1"><strong>Customer Name:</strong> Arnel Cellona</p>
                <p className="mb-1"><strong>Plan:</strong> STARTER FIT PLAN</p>
                <p className="mb-1"><strong>Duration:</strong> 1 Month</p>
                <p className="mb-1"><strong>Avail Date:</strong> March 16, 2025</p>
                <p className="mb-1"><strong>Valid Until:</strong> April 16, 2025</p>
                <p className="mb-1"><strong>Payment Method:</strong> GCASH</p>
                <p className="mb-1"><strong>Membership Status:</strong> <span className="badge bg-success">Approved</span></p>
                <p className="fw-bold fs-5 text-primary"><strong>Amount Paid:</strong> ₱2,500</p>
              </div>
              <hr />
              <p className="text-muted mt-3">
                Enjoy unlimited gym access with top-quality equipment, hot & cold showers, cold filtered drinking water, free WiFi, and professional, friendly staff. Stay fit today!
              </p>
              <button className="btn btn-primary btn-sm no-print" onClick={printReceipt}>
                <i className="bi bi-printer"></i> Print Receipt
              </button>
            </div>
          </div>

    
        </div>
      </div>

      {/* Screen Styling */}
      <style jsx>{`

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
      `}</style>
    </div>
  );
};

export default ViewMembershipDetails;
