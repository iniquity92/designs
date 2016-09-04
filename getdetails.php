<?php
    include("db.inc.php");
    $feature_title;
    $data = array();
    $images = array();
    if(isset($_GET['feature'])){
        $feature_title = $_GET['feature'];
        $con = new mysqli($HOST,$USER,$PASSWORD,$DATABASE);
        if(!$con){
            die("MySql cannot be reached");
        }
        else{
            $query = "SELECT f_id,f_about FROM features WHERE f_title='".$feature_title."'";
            $result = $con->query($query);
            if($result->num_rows>0){
                while($feature=$result->fetch_assoc()){
                    $data['about'] = $feature['f_about'];
                    $query_pics = "SELECT pics.p_name,pics.p_url,pics.p_about FROM pics JOIN pics_for_feature ON pics.p_id = pics_for_feature.p_id WHERE pics_for_feature.f_id='". $feature['f_id']."'";
                    $result_pics = $con->query($query_pics);
                    if($result_pics->num_rows>0){
                        while($pics = $result_pics->fetch_assoc()){
                            $images[]=$pics;

                        }
                    }
                    $data['images']=$images;

                }
            }
            else{
                echo $con->error;
                echo "No result found for your query";
            }
        }
        /*print_r($data);
        echo "<br /><br />";*/
        echo json_encode($data);
    }
    else{
        die("No feature found");
        exit();
    }

?>