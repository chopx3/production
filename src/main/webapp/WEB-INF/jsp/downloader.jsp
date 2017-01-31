
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="Create .zip files using Javascript. Provides a simple API to place any content generated by Javascript into a .zip file for your users." />
    <title>Mini app : Downloader</title>

    <!-- Latest compiled and minified CSS -->
    <link rel="stylesheet" href="//netdna.bootstrapcdn.com/bootstrap/3.1.1/css/bootstrap.min.css">

    <!-- Optional theme -->
    <link rel="stylesheet" href="//netdna.bootstrapcdn.com/bootstrap/3.1.1/css/bootstrap-theme.min.css">

    <!-- Latest compiled and minified JavaScript -->
    <!-- <script src="//netdna.bootstrapcdn.com/bootstrap/3.1.1/js/bootstrap.min.js"></script> -->

    <%--<link rel="stylesheet" href="/jszip/documentation/css/pygments.css">--%>
    <%--<link rel="stylesheet" href="/jszip/documentation/css/main.css">--%>

    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/jszip.js"></script>

    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/jszip-utils.js"></script>
    <!--
    Mandatory in IE 6, 7, 8 and 9.
    -->
    <!--[if IE]>
    <script type="text/javascript" src="//stuk.github.io/jszip-utils/dist/jszip-utils-ie.js"></script>
    <![endif]-->

    <!--
    Any version of jQuery will do (it's just to write some examples), this one
    happens to be available in our tests.
    -->
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/jquery-1.8.3.min.js"></script>

    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/fileSaver.js"></script>
</head>
<body>
        <div class="col-md-9">
            <h1>Mini app : Downloader</h1>

            <div id="downloader_application">
                <h3>Please select your files</h3>
                <form action="#" id="download_form" >
                    <ul>
                        <li>
                            <label>
                                <input type="checkbox" data-url="/shoptracker/resources/js/downloader.js" checked />
                                downloader
                            </label>
                        </li>

                        <li>
                            <label>
                                <input type="checkbox" data-url="http://web_api:s7cgr3Ev@192.168.3.10:4055/download/byscript?name=Avito_get_file_by_id_conn&startparam1=E72B90CD-7580-4126-8AB3-6B532B6E214E&attachment=1" />
                                record
                                <audio src="http://web_api:s7cgr3Ev@192.168.3.10:4055/download/byscript?name=Avito_get_file_by_id_conn&startparam1=E72B90CD-7580-4126-8AB3-6B532B6E214E&attachment=1" controls/>
                            </label>
                        </li>

                    <button type="submit" class="btn btn-primary">pack them !</button>
                </form>

                <div class="progress hide" id="progress_bar">
                    <div class="progress-bar" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;">
                    </div>
                </div>

                <p class="hide" id="result"></p>

            </div>

            <script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/downloader.js"></script>


            <!-- ===================== -->
            <!-- == / C O N T E N T == -->
            <!-- ===================== -->
        </div>
    </div>
</div>
<script>
    // FIXME find how to do that cleanly
    (function(){
        var tables = document.getElementsByTagName("table");
        for(var i = 0; i < tables.length; i++) {
            tables[i].className += " table table-condensed table-striped table-bordered ";
        }
    })();
</script>

<script>

    (function() {
        document.getElementById("oktell").onclick = function() {
            var wnd = window.open("http://web_api:s7cgr3Ev@192.168.3.10:4055/download/", "hello", "width=200,height=200");

            wnd.onerror = function(){
                wnd.document.write("Соединение с октелл...");
                wnd.alert("error");
            };
            setTimeout(function() {
                wnd.close();
            }, 1500);
            return false;
        };
    })();

</script>


<script>
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
                (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
            m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

    ga('create', 'UA-52085706-1', 'stuk.github.io');
    ga('send', 'pageview');

</script>
</body>
</html>
