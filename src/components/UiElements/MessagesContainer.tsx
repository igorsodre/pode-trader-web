import React, { useContext } from 'react';
import { AppContext, IAppContext } from '../../data/app-context';
import { AppMessage } from '../../data/models/app-messages-interface';
import './MessagesContainer.scss';

const MessagesContainer: React.FC = (props) => {
  const ctx = useContext(AppContext) as IAppContext;
  if (ctx.appMessages.length) {
    console.log(ctx.appMessages);
  }

  const dismissMessageHandler = (message: AppMessage) => {
    ctx.removeMessage(message);
  };

  const _renderMessage = (message: AppMessage, index: number): JSX.Element => {
    let className: string;
    switch (message.type) {
      case 'ERROR':
        className = 'danger';
        break;
      case 'WARN':
        className = 'warning';
        break;
      case 'INFO':
        className = 'info';
        break;
      case 'SUCCESS':
        className = 'success';
        break;
      default:
        className = 'dark';
    }

    return (
      <div key={index} className={`alert alert-${className} alert-dismissible fade show`} role="alert">
        {message.text}
        <button
          type="button"
          className="close"
          data-dismiss="alert"
          aria-label="Close"
          onClick={() => dismissMessageHandler(message)}
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    );
  };
  if (!ctx.appMessages || !ctx.appMessages.length) return null;
  return (
    <div className="messages-container-component container">{ctx.appMessages.map((m, i) => _renderMessage(m, i))}</div>
  );
};

export default MessagesContainer;
