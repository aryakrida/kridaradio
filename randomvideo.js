var videos = [
'7ED55ZdhIk4',
'krAjxTDX9SA',
'bFPGoI_6qJo',
'VXgBfzw3M8Y',
'1tHju5eXAtc',
'x_yEVJnPv90',
'miwUYdNAMGA',
'NVfeMLiE-Ys'
];

var index=Math.floor(Math.random() * videos.length);
var html='<iframe style="padding: 16px 0;height:250px;" src="https://www.youtube.com/embed/' + videos[index] + '" allowfullscreen></iframe>';
document.write(html);
