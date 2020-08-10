const axios = require("axios");
const cheeio = require("cheerio");
const log = console.log


const getHtml = async() => {
	        try{
				            return await axios.get("https://www.naver.com/");
							        }
			        catch(error){
						            console.error(error);
									        }
					    };

    getHtml()
	    .then(html => {
			        let ulList = [];
					        const $ = cheerio.load(html.data);
							        const $bodylist = $("div.ah_list.PM_CL_realtimeKeyword_list_base ul.ah_l").children("li.ah_item");

									        $bodylist.each(function(i, elem){
												            ulList[i] = {
																                title: $(this).find('span.ah_k').text(),
																				                url: $(this).find('a.ah_a').attr('href')
																									            };
															        });
											        const data = ulList.filter(n => n.title);
													        console.log('data:', data);
															        return data;
																	    })
    .then(res => log(res));
