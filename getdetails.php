<?php
    include("db.inc.php");
        $con = new mysqli($HOST,$USER,$PASSWORD,$DATABASE);
        if(!$con){
            die("MySql cannot be reached");
        }
        else{
            $i=0;
            $j=0;
            $images = array();
            $data = array();
            $query = "SELECT f_id,f_title,f_about FROM features";
            $result = $con->query($query);
            if($result->num_rows>0){
                while($feature = $result->fetch_assoc()){
                    $j=0;
                    $data[$feature['f_title']]['about'] = $feature['f_about'];
                    $query_pics = "SELECT pics.p_name,pics.p_url,pics.p_about FROM pics JOIN
                                    pics_for_feature ON pics.p_id = pics_for_feature.p_id WHERE
                                    pics_for_feature.f_id =".$feature['f_id'];
                    $result_pics = $con->query($query_pics);
                    if($result_pics->num_rows>0){
                        while($pics = $result_pics->fetch_assoc()){
                            $images[$i][$j]=$pics;    
                            $j++;
                        }
                    }
                    $data[$feature['f_title']]['images'] = $images[$i]; 
                    $i++;
                }
            }
                
            else{
                echo $con->error;
                echo "No result found for your query";
            }
            //var_dump($data);
        }
        /*print_r($data);
        echo "<br /><br />";*/
        $fp = fopen("git_json_data.txt","w");
        fwrite($fp,json_encode($data));
        fclose($fp);

       // echo json_encode($data);

    
    

?>