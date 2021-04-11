var limit="0:30"

if (document.images){
var parselimit=limit.split(":")
parselimit=parselimit[0]*60+parselimit[1]*1
}
function beginrefresh(){
if (!document.images)
return
if (parselimit==1)
window.location.reload()
else{ 
parselimit-=1
curmin=Math.floor(parselimit/60)
cursec=parselimit%60
if (curmin!=0)
curtime=curmin+" minutes and "+cursec+" seconds left until page refresh!"
else
curtime=cursec+"Station naam"
window.status=curtime
setTimeout("beginrefresh()",1000)
}
}

window.onload=beginrefresh




function getMp3StreamTitle($streamingUrl, $interval, $offset = 0, $headers = true)
{
    $needle = 'StreamTitle=';
    $ua = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/27.0.1453.110 Safari/537.36';

    $opts = array('http' => array(
            'method' => 'GET',
            'header' => 'Icy-MetaData: 1',
            'user_agent' => $ua
        )
    );

    if (($headers = get_headers($streamingUrl)))
        foreach ($headers as $h){
            $currentSection = explode(':', $h);
            if (strpos(strtolower($h), 'icy-metaint') !== false && ($interval = $currentSection[1]))
                break;
        }
    $context = stream_context_create($opts);

    if ($stream = fopen($streamingUrl, 'r', false, $context))
    {
    $buffer = stream_get_contents($stream, $interval, $offset);
    fclose($stream);

    if (strpos($buffer, $needle) !== false)
    {
    $currentSectionTwo = explode($needle, $buffer);
    $title = $currentSectionTwo[1];
    return substr($title, 1, strpos($title, ';') - 2);
    }
    else
    return getMp3StreamTitle($streamingUrl, $interval, $offset + $interval, false);
    }
    else
    throw new Exception("Unable to open stream [{$streamingUrl}]");
    }

   $nowplaying= (getMp3StreamTitle('https://play.kridaradio.com/radio/8330/permatafm', 16000));
   echo "$nowplaying";

