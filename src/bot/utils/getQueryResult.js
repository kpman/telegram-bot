import * as videos from '../../models/videos';

const getQueryResult = async (message, messageText, type, page) => {
  let videosObj;
  let typeStr;

  if (type === 'code') {
    videosObj = await videos.getVideo(type, messageText.toUpperCase(), page);
    typeStr = '番號';
  } else if (type === 'models') {
    videosObj = await videos.getVideo(type, messageText, page);
    typeStr = '女優';
  } else if (type === 'title') {
    videosObj = await videos.getVideo(type, messageText, page);
    typeStr = '片名';
  } else {
    videosObj = await videos.getRandomThreeVideos();
    let urlStr = '';

    videosObj.results.forEach(video => {
      urlStr += `${video.url}\n`;
    });

    return [urlStr];
  }

  let str = '';
  if (videosObj.results.length === 0) {
    str = `搜尋不到此${typeStr}`;
    return [str];
  }
  str = `幫你搜尋${typeStr}：${videosObj.searchValue}`;

  let urlStr = '';
  videosObj.results.forEach(video => {
    urlStr += `${video.url}\n`;
  });
  const totalStr = `總共搜尋到：${videosObj.results.length} 個連結喔喔喔`;

  return [str, urlStr, totalStr];
};

export default getQueryResult;
