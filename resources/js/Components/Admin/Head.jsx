import React from 'react';
import { Helmet } from 'react-helmet';

const AdminHead = () => {
    return (
        <Helmet>
 
            <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,600,600i,700,700i|Nunito:300,300i,400,400i,600,600i,700,700i|Poppins:300,300i,400,400i,500,500i,600,600i,700,700i" rel="stylesheet" />

            <link href="/template/admin/assets/vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet" />
            <link href="/template/admin/assets/vendor/bootstrap-icons/bootstrap-icons.css" rel="stylesheet" />
            <link href="/template/admin/assets/vendor/boxicons/css/boxicons.min.css" rel="stylesheet"/>
            <link href="/template/admin/assets/vendor/quill/quill.snow.css" rel="stylesheet" />
            <link href="/template/admin/assets/vendor/quill/quill.bubble.css" rel="stylesheet" />
            <link href="/template/admin/assets/vendor/remixicon/remixicon.css" rel="stylesheet" />
            <link href="/template/admin/assets/vendor/simple-datatables/style.css" rel="stylesheet" />
            <link href="/template/admin/assets/css/style.css" rel="stylesheet" />

            {/* <script src="/template/admin/assets/vendor/apexcharts/apexcharts.min.js" 
            ></script> */}
            <script src="/template/admin/assets/vendor/bootstrap/js/bootstrap.bundle.min.js" ></script>
            {/* <script src="/template/admin/assets/vendor/chart.js/chart.umd.js" ></script>
            <script src="/template/admin/assets/vendor/echarts/echarts.min.js" ></script> */}
            <script src="/template/admin/assets/vendor/quill/quill.js" ></script>
            <script src="/template/admin/assets/vendor/simple-datatables/simple-datatables.js" ></script>
            <script src="/template/admin/assets/vendor/tinymce/tinymce.min.js" ></script>
            <script src="/template/admin/assets/vendor/php-email-form/validate.js" ></script>
            <script src="/template/admin/assets/js/main.js" defer></script>

        </Helmet>
    );
};

export default AdminHead;
