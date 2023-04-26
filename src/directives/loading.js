import styles from './loading.module.less';
import loadingUrl from '@/assets/loading.svg';
// 查找有没有loading的图片
function getImage(el) {
  return el.querySelector('img[data-loading=loading]');
}
// 创建loading图片
function createImage() {
  const img = document.createElement('img');
  img.dataset.loading = 'loading';
  img.src = loadingUrl;
  img.classList.add(styles.loading);
  return img;
}

// 导出指令配置对象
export default function (el, binding) {
  // 该函数会被同时设置到bind和update中
  // 根据bind.value的值，决定创建img元素或者删除img元素

  const curImage = getImage(el);

  if (binding.value) {
    if (!curImage) {
      el.appendChild(createImage());
    }
  } else {
    if (curImage) {
      curImage.remove();
    }
  }
}
