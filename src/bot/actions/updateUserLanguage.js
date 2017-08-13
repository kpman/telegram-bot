import locale from '../locale';
import { updateUser } from '../../models/users';
import userAuthenticatedMiddleware from '../middleware/userAuthenticatedMiddleware';

const updateUserLanguage = async (context, next) => {
  const { from: { id: userId } } = context.event._rawEvent.message;
  const languageCode =
    context.event._rawEvent.message.text === '繁體中文' ? 'zh-TW' : 'en';

  await updateUser(userId, { languageCode });

  await context.sendMessage(locale(languageCode).updateUserLanguage, {
    parse_mode: 'Markdown',
  });

  await userAuthenticatedMiddleware(context, next);
};

export default updateUserLanguage;