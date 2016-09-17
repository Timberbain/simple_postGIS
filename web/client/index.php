<html>
    <head>
        <!-- link rel="stylesheet" href="js/dist/leaflet.css" /-->
        <!-- script type="text/javascript" src="js/dist/leaflet.js"></script-->

        <!--script src="http://maps.google.com/maps/api/js?v=3.2&sensor=false"></script-->
        <!--script src="http://matchingnotes.com/javascripts/leaflet-google.js"></script-->


        <!--script type="text/javascript" src="dist/bundle.js"></script-->
        <style>
            #map {
                height: 600px;
            }

        </style>
    </head>
    <body>

        <br/>
        <?php
        $host = "host=postgres";
        $port = "port=5432";
        $dbname = "dbname=gis";
        $credentials = "user=postgis password=postpass";

        $db = pg_connect( "$host $port $dbname $credentials");
        if(!$db){
            echo "Error: Unable to open database\n";
        } else {
            echo "Opened database successfully\n";

        /*
            "id_0" numeric(10,0),
            "iso" varchar(3),
            "name_0" varchar(75),
            "id_1" numeric(10,0),
            "name_1" varchar(75),
            "id_2" numeric(10,0),
            "name_2" varchar(75),
            "hasc_2" varchar(15),
            "ccn_2" numeric(10,0),
            "cca_2" varchar(254),
            "type_2" varchar(50),
            "engtype_2" varchar(50),
            "nl_name_2" varchar(75),
            "varname_2" varchar(150),
            "geog" geography(MULTIPOLYGON,4326));
        */


            $query = "select name_2, hasc_2, ST_asText(geog) from swe_adm2 limit 10";

            $result = pg_query($query);
            echo "<pre>";
            while($row = pg_fetch_row($result)){
                print_r($row);
            }



        }
        ?>
        <div id="map"></div>
    </body>
</html>
