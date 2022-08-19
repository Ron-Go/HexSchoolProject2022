import emitter from '@/utils/emitter';

export default function pushToastMessage(response, title = '更新') {
  if (response.data.success) {
    emitter.emit('toastMessage', {
      style: 'success',
      title: `${title}成功`,
    });
  } else {
    const message = typeof response.data.message === 'string' ? [response.data.message] : response.data.message;
    emitter.emit('toastMessage', {
      style: 'danger',
      title: `${title}失敗`,
      content: message.join(','),
    });
  }
}
