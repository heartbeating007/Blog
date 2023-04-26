import eventBus from '@/eventBus.js';
import { debounce } from '@/utils';
import defaultGif from '@/assets/default.gif';

// 定义一个数组，在img元素生成的时候就把他的信息加入进来，
let imgs = [];
/**
 *调用该函数，就可以设置那些合适的图片加载
 */
function setImage(img) {
  img.dom.src = defaultGif; //先使用默认图片
  // 该图片是否在页面范围内
  const rect = img.dom.getBoundingClientRect(); //得到图片在页面中的位置
  const clientHight = document.documentElement.clientHeight; // 视口高度
  // 如果图片的top>-自身的高度，并且top<视口的高度
  if (rect.top > -rect.height && rect.top < clientHight) {
    //  在视口范围内
    //   创建一张图片去加载他的远程真实图片
    const tempImg = new Image();
    tempImg.onload = function () {
      //因为浏览器有缓存 当真实图片加载完成之后,直接把图片设置成远程加载好的图片
      img.dom.src = img.src;
    };
    tempImg.src = img.src; //加载远程图片

    //   处理完成后从数组里面移除
    imgs = imgs.filter((i) => i !== img);
  }
}
function setImages() {
  for (const img of imgs) {
    // 循环数组，挨个处理图片
    setImage(img);
  }
}

function handleScroll() {
  setImages();
}
eventBus.$on('mainScroll', debounce(handleScroll));
export default {
  inserted(el, bindings) {
    const img = {
      dom: el,
      src: bindings.value
    };
    imgs.push(img);
    // 立即处理
    setImage(img);
  },
  unbind(el) {
    imgs = imgs.filter((img) => img.dom !== el);
  }
};
