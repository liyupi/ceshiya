import classnames from 'classnames';
import './index.less';

/**
 * 热搜排序
 * @param index
 * @constructor
 * @author liyupi https://yuyuanweb.feishu.cn/wiki/Abldw5WkjidySxkKxU2cQdAtnah
 */
function RankOrder({ index }: { index: number }) {
  return (
    <span>
      <div className="HotItem-index">
        <div
          className={classnames({
            'HotItem-rank': true,
            'HotItem-hot': index < 3,
          })}
        >
          {index + 1}
        </div>
      </div>
    </span>
  );
}

export default RankOrder;
