const RCUniIM = uni.requireNativePlugin('RongCloud-IM-V2-RCUniIMV2');
let instance;
export default class RCIMIWEngine {
	static _invokeMethod(name, params) {
	    console.log(`invokeMethod methodName: ${name}, params:${JSON.stringify(params)}`);
	    return new Promise((resolve, _) => {
	        RCUniIM.invokeMethod({ name, params }, (res) => {
	            resolve(res);
	        });
	    });
	}
    _invokeMethod(name, params) {
        console.log(`invokeMethod methodName: ${name}, params:${JSON.stringify(params)}`);
        return new Promise((resolve, _) => {
            RCUniIM.invokeMethod({ name, params }, (res) => {
                resolve(res);
            });
        });
    }
    _setListener(eventName, callback) {
        console.log(`setListener eventName: ${eventName}, callback:${callback == null}`);
        // 因为单个事件名只支持设置一个监听，所以要先移除已有的监听。
        RCUniIM.removeAllEventListeners(eventName);
        if (callback) {
            let listener = (res) => {
                callback(res.data);
            };
            RCUniIM.addEventListener(eventName, listener);
        }
    }
    /**
     * 初始化 IM 对象
     * @param appKey 融云后台申请的应用 appKey
     * @param options 全局配置项
     * @returns 创建的 IM 对象
     */
    static async create(appKey, options = {}) {
        if (instance) {
            return new Promise((resolve) => resolve(instance));
        }
        let code = await RCIMIWEngine._invokeMethod('create', { appKey, options });
        if (code === 0) {
			instance = new RCIMIWEngine();
            return instance;
        } else {
			console.log('instance = null');
			instance = null;
		}
        return new Promise((resolve) => resolve(undefined));
    }
    /**
     * 销毁 IM 对象
     */
    destroy() {
        instance = undefined;
        return this._invokeMethod('destroy');
    }
    /**
     * 根据消息 id 获取消息体（本地数据库索引唯一值）。
     * @param messageId 消息的 messageId，可在消息对象中获取
     */
    getMessageById(messageId) {
        return this._invokeMethod('getMessageById', { messageId });
    }
    /**
     * 通过全局唯一 id 获取消息实体。
     * @param messageUId 消息的 messageUid，可在消息对象中获取，且只有发送成功的消息才会有值。
     */
    getMessageByUId(messageUId) {
        return this._invokeMethod('getMessageByUId', { messageUId });
    }
    /**
     * 连接融云服务器，在整个应用程序全局，只需要调用一次。调用此接口返回非业务错误码时，SDK 会启动重连机制进行重连；如果仍没有连接成功，会在设备网络状态变化时再次进行重连。
     * @param token   调用 server api 获取到的 token
     * @param timeout 连接超时时间，单位：秒。
     * timeLimit <= 0，则 IM 将一直连接，直到连接成功或者无法连接（如 token 非法）
     * timeLimit > 0，则 IM 将最多连接 timeLimit 秒
     * 如果在 timeLimit 秒内连接成功，后面再发生了网络变化或前后台切换，SDK 会自动重连； 如果在 timeLimit 秒无法连接成功则不再进行重连，通过 listener 告知连接超时，您需要再自行调用 connect 接口
     * @return 当次接口操作的状态码。0 代表调用成功 具体结果需要实现接口回调，非 0 代表当前接口调用操作失败，不会触发接口回调，详细错误参考错误码
     * @listener 接口回调可以监听 [onConnected]
     */
    connect(token, timeout) {
        return this._invokeMethod('connect', { token, timeout });
    }
    /**
     * 断开链接
     * 注：因为 SDK 在前后台切换或者网络出现异常都会自动重连，保证连接可靠性。 所以除非您的 App 逻辑需要登出，否则一般不需要调用此方法进行手动断开
     * @param receivePush 退出后是否接收 push，true:断开后接收远程推送，false:断开后不再接收远程推送
     * @return 当次接口操作的状态码。0 代表调用成功 具体结果需要实现接口回调，非 0 代表当前接口调用操作失败，不会触发接口回调，详细错误参考错误码
     */
    disconnect(receivePush) {
        return this._invokeMethod('disconnect', { receivePush });
    }
    /**
     * 构建文本消息
     * @param type      会话类型，
     * @param targetId  会话 ID
     * @param channelId 频道 ID，仅支持超级群使用，其他会话类型传 null 即可。
     * @param text      文本内容
     * @return 文本消息实体
     */
    createTextMessage(type, targetId, channelId, text) {
        return this._invokeMethod('createTextMessage', { type, targetId, channelId, text });
    }
    /**
     * 构建图片消息
     * @param type      会话类型
     * @param targetId  会话 ID
     * @param channelId 频道 ID，仅支持超级群使用，其他会话类型传 null 即可。
     * @param path      图片消息的本地路径，必须为有效路径
     * @return 图片消息实体
     */
    createImageMessage(type, targetId, channelId, path) {
        return this._invokeMethod('createImageMessage', { type, targetId, channelId, path });
    }
    /**
     * 构建文件消息
     * @param type      会话类型
     * @param targetId  会话 ID
     * @param channelId 频道 ID，仅支持超级群使用，其他会话类型传 null 即可。
     * @param path      文件消息的本地路径，必须为有效路径
     * @return 文件消息实体
     */
    createFileMessage(type, targetId, channelId, path) {
        return this._invokeMethod('createFileMessage', { type, targetId, channelId, path });
    }
    /**
     * 构建小视频消息
     * @param type      会话类型
     * @param targetId  会话 ID
     * @param channelId 频道 ID，仅支持超级群使用，其他会话类型传 null 即可。
     * @param path      小视频消息的本地路径，必须为有效路径
     * @param duration  小视频消息的视频时长
     * @return 视频消息实体
     */
    createSightMessage(type, targetId, channelId, path, duration) {
        return this._invokeMethod('createSightMessage', {
            type,
            targetId,
            channelId,
            path,
            duration,
        });
    }
    /**
     * 构建语音消息 (高清语音)
     * @param type      会话类型
     * @param targetId  会话 ID
     * @param channelId 频道 ID，仅支持超级群使用，其他会话类型传 null 即可。
     * @param path      语音消息的本地路径，必须为有效路径
     * @param duration  语音消息的消息时长
     * @return 语音消息的实体
     */
    createVoiceMessage(type, targetId, channelId, path, duration) {
        return this._invokeMethod('createVoiceMessage', {
            type,
            targetId,
            channelId,
            path,
            duration,
        });
    }
    /**
     * 构建引用消息
     * @param type             会话类型
     * @param targetId         会话 ID
     * @param channelId        频道 ID，仅支持超级群使用，其他会话类型传 null 即可。
     * @param referenceMessage 引用的消息
     * @param text             引用的文本内容
     * @return 引用消息实体
     */
    createReferenceMessage(type, targetId, channelId, referenceMessage, text) {
        return this._invokeMethod('createReferenceMessage', {
            type,
            targetId,
            channelId,
            referenceMessage,
            text,
        });
    }
    /**
     * 构建 GIF 消息
     * @param type      会话类型
     * @param targetId  会话 ID
     * @param channelId 频道 ID，仅支持超级群使用，其他会话类型传 null 即可。
     * @param path      GIF 消息的本地路径
     * @return GIF 消息实体
     */
    createGIFMessage(type, targetId, channelId, path) {
        return this._invokeMethod('createGIFMessage', { type, targetId, channelId, path });
    }
    /**
     * 构建自定义消息
     * @param type              会话类型
     * @param targetId          会话 ID
     * @param channelId         频道 ID，仅支持超级群使用，其他会话类型传 null 即可。
     * @param policy            消息的存储策略
     * @param messageIdentifier 消息的标识符，需唯一
     * @param fields            消息的内容键值对
     * @return 自定义消息实体
     */
    createCustomMessage(type, targetId, channelId, policy, messageIdentifier, fields) {
        return this._invokeMethod('createCustomMessage', {
            type,
            targetId,
            channelId,
            policy,
            messageIdentifier,
            fields,
        });
    }
    /**
     * 构建位置消息
     * @param type          会话类型
     * @param targetId      会话 ID
     * @param channelId     频道 ID，仅支持超级群使用，其他会话类型传 null 即可。
     * @param longitude     经度
     * @param latitude      纬度
     * @param poiName       POI 信息
     * @param thumbnailPath 缩略图本地路径，必须为有效路径
     * @return 位置消息实体
     */
    createLocationMessage(type, targetId, channelId, longitude, latitude, poiName, thumbnailPath) {
        return this._invokeMethod('createLocationMessage', {
            type,
            targetId,
            channelId,
            longitude,
            latitude,
            poiName,
            thumbnailPath,
        });
    }
    /**
     * 发送普通消息
     * @param message 发送的消息实体
     * @return 当次接口操作的状态码。0 代表调用成功 具体结果需要实现接口回调，非 0 代表当前接口调用操作失败，不会触发接口回调，详细错误参考错误码
     * @listener 接口回调可以监听 [onMessageAttached],[onMessageSent]
     */
    sendMessage(message) {
        return this._invokeMethod('sendMessage', { message });
    }
    /**
     * 发送媒体消息
     * @param message 发送的媒体消息实体
     * @return 当次接口操作的状态码。0 代表调用成功 具体结果需要实现接口回调，非 0 代表当前接口调用操作失败，不会触发接口回调，详细错误参考错误码
     * @listener 接口回调可以监听 [onMediaMessageSending],[onMediaMessageAttached],[onMediaMessageAttached],[onMediaMessageSent]
     */
    sendMediaMessage(message) {
        return this._invokeMethod('sendMediaMessage', { message });
    }
    /**
     * 取消发送媒体消息
     * @param message 需要取消发送的媒体消息实体
     * @return 当次接口操作的状态码。0 代表调用成功 具体结果需要实现接口回调，非 0 代表当前接口调用操作失败，不会触发接口回调，详细错误参考错误码
     * @listener 接口回调可以监听 [onSendingMediaMessageCanceled]
     */
    cancelSendingMediaMessage(message) {
        return this._invokeMethod('cancelSendingMediaMessage', { message });
    }
    /**
     * 下载媒体消息
     * @param message 需要下载的媒体消息实体
     * @return 当次接口操作的状态码。0 代表调用成功 具体结果需要实现接口回调，非 0 代表当前接口调用操作失败，不会触发接口回调，详细错误参考错误码
     * @listener [onMediaMessageDownloaded], [onMediaMessageDownloading]
     */
    downloadMediaMessage(message) {
        return this._invokeMethod('downloadMediaMessage', { message });
    }
    /**
     * 取消下载媒体消息
     * @param message 需要取消下载的媒体消息实体
     * @return 当次接口操作的状态码。0 代表调用成功 具体结果需要实现接口回调，非 0 代表当前接口调用操作失败，不会触发接口回调，详细错误参考错误码
     * @listener [onDownloadingMediaMessageCanceled]
     */
    cancelDownloadingMediaMessage(message) {
        return this._invokeMethod('cancelDownloadingMediaMessage', { message });
    }
    /**
     * 加载某个会话
     * @param type      会话类型
     * @param targetId  会话 ID
     * @param channelId 频道 ID，仅支持超级群使用，其他会话类型传 null 即可。
     * @return 当次接口操作的状态码。0 代表调用成功 具体结果需要实现接口回调，非 0 代表当前接口调用操作失败，不会触发接口回调，详细错误参考错误码
     * @listener [onConversationLoaded]
     */
    loadConversation(type, targetId, channelId) {
        return this._invokeMethod('loadConversation', { type, targetId, channelId });
    }
    /**
     * 加载某些会话
     * @param conversationTypes 会话类型
     * @param channelId         频道 ID，仅支持超级群使用，其他会话类型传 null 即可。
     * @param startTime         时间戳（毫秒），获取小于此时间戳的会话，传 0 为查询最新数据
     * @param count             查询的数量， 0 < count <= 50
     * @return 当次接口操作的状态码。0 代表调用成功 具体结果需要实现接口回调，非 0 代表当前接口调用操作失败，不会触发接口回调，详细错误参考错误码
     * @listener [onConversationsLoaded]
     */
    loadConversations(conversationTypes, channelId, startTime, count) {
        return this._invokeMethod('loadConversations', { conversationTypes, channelId, startTime, count });
    }
    /**
     * 移除某个会话
     * @param type      会话类型
     * @param targetId  会话 ID
     * @param channelId 频道 ID，仅支持超级群使用，其他会话类型传 null 即可。
     * @return 当次接口操作的状态码。0 代表调用成功 具体结果需要实现接口回调，非 0 代表当前接口调用操作失败，不会触发接口回调，详细错误参考错误码
     * @listener [onConversationRemoved]
     */
    removeConversation(type, targetId, channelId) {
        return this._invokeMethod('removeConversation', { type, targetId, channelId });
    }
    /**
     * 根据会话类型移除会话
     * @param conversationTypes 会话类型集合
     * @param channelId         频道 ID，仅支持超级群使用，其他会话类型传 null 即可。
     * @return 当次接口操作的状态码。0 代表调用成功 具体结果需要实现接口回调，非 0 代表当前接口调用操作失败，不会触发接口回调，详细错误参考错误码
     * @listener [onConversationsRemoved]
     */
    removeConversations(conversationTypes, channelId) {
        return this._invokeMethod('removeConversations', { conversationTypes, channelId });
    }
    /**
     * 加载某个会话的未读数
     * 注：不支持聊天室！
     * @param type      会话类型
     * @param targetId  会话 ID
     * @param channelId 频道 ID，仅支持超级群使用，其他会话类型传 null 即可。
     * @return 当次接口操作的状态码。0 代表调用成功 具体结果需要实现接口回调，非 0 代表当前接口调用操作失败，不会触发接口回调，详细错误参考错误码
     * @listener [onUnreadCountLoaded]
     */
    loadUnreadCount(type, targetId, channelId) {
        return this._invokeMethod('loadUnreadCount', { type, targetId, channelId });
    }
    /**
     * 加载所有未读数
     * @param channelId 频道 ID，仅支持超级群使用，其他会话类型传 null 即可。
     * @return 当次接口操作的状态码。0 代表调用成功 具体结果需要实现接口回调，非 0 代表当前接口调用操作失败，不会触发接口回调，详细错误参考错误码
     * @listener [onTotalUnreadCountLoaded]
     */
    loadTotalUnreadCount(channelId) {
        return this._invokeMethod('loadTotalUnreadCount', { channelId });
    }
    /**
     * 获取会话中未读的 @ 消息。
     * 注：不支持聊天室！
     * @param type      会话类型
     * @param targetId  会话 ID
     * @param channelId 频道 ID，仅支持超级群使用，其他会话类型传 null 即可。
     * @return 当次接口操作的状态码。0 代表调用成功 具体结果需要实现接口回调，非 0 代表当前接口调用操作失败，不会触发接口回调，详细错误参考错误码
     * @listener [onUnreadMentionedCountLoaded]
     */
    loadUnreadMentionedCount(type, targetId, channelId) {
        return this._invokeMethod('loadUnreadMentionedCount', { type, targetId, channelId });
    }
    /**
     * 获取当前用户加入的所有超级群会话的未读消息数的总和。
     * @return 当次接口操作的状态码。0 代表调用成功 具体结果需要实现接口回调，非 0 代表当前接口调用操作失败，不会触发接口回调，详细错误参考错误码
     * @listener [onUltraGroupAllUnreadCountLoaded]
     */
    loadUltraGroupAllUnreadCount() {
        return this._invokeMethod('loadUltraGroupAllUnreadCount', {});
    }
    /**
     * 获取当前用户加入的所有超级群会话中的未读 @ 消息数的总和。
     * @return 当次接口操作的状态码。0 代表调用成功 具体结果需要实现接口回调，非 0 代表当前接口调用操作失败，不会触发接口回调，详细错误参考错误码
     * @listener [onUltraGroupAllUnreadMentionedCountLoaded]
     */
    loadUltraGroupAllUnreadMentionedCount() {
        return this._invokeMethod('loadUltraGroupAllUnreadMentionedCount', {});
    }
    /**
     * 获取指定会话的未读消息数
     * @param targetId 会话 ID
     * @return 当次接口操作的状态码。0 代表调用成功 具体结果需要实现接口回调，非 0 代表当前接口调用操作失败，不会触发接口回调，详细错误参考错误码
     * @listener [onUltraGroupUnreadCountLoaded]
     */
    loadUltraGroupUnreadCount(targetId) {
        return this._invokeMethod('loadUltraGroupUnreadCount', { targetId });
    }
    /**
     * 获取超级群会话中被 @ 的消息数
     * @param targetId 会话 ID
     * @return 当次接口操作的状态码。0 代表调用成功 具体结果需要实现接口回调，非 0 代表当前接口调用操作失败，不会触发接口回调，详细错误参考错误码
     * @listener [onUltraGroupUnreadMentionedCountLoaded]
     */
    loadUltraGroupUnreadMentionedCount(targetId) {
        return this._invokeMethod('loadUltraGroupUnreadMentionedCount', { targetId });
    }
    /**
     * 根据会话类型加载未读数
     * 注：不支持聊天室！
     * @param conversationTypes 会话类型集合
     * @param channelId         频道 ID，仅支持超级群使用，其他会话类型传 null 即可。
     * @param contain           是否包含免打扰消息的未读消息数。
     * @return 当次接口操作的状态码。0 代表调用成功 具体结果需要实现接口回调，非 0 代表当前接口调用操作失败，不会触发接口回调，详细错误参考错误码
     * @listener [onUnreadCountByConversationTypesLoaded]
     */
    loadUnreadCountByConversationTypes(conversationTypes, channelId, contain) {
        return this._invokeMethod('loadUnreadCountByConversationTypes', {
            conversationTypes,
            channelId,
            contain,
        });
    }
    /**
     * 清除某个会话中的未读消息数。
     * 注：不支持聊天室！
     * @param type      会话类型
     * @param targetId  会话 ID
     * @param channelId 频道 ID，仅支持超级群使用，其他会话类型传 null 即可。
     * @param timestamp 该会话已阅读的最后一条消息的发送时间戳
     * @return 当次接口操作的状态码。0 代表调用成功 具体结果需要实现接口回调，非 0 代表当前接口调用操作失败，不会触发接口回调，详细错误参考错误码
     * @listener [onUnreadCountCleared]
     */
    clearUnreadCount(type, targetId, channelId, timestamp) {
        return this._invokeMethod('clearUnreadCount', { type, targetId, channelId, timestamp });
    }
    /**
     * 保存会话草稿信息。
     * @param type      会话类型
     * @param targetId  会话 ID
     * @param channelId 频道 ID，仅支持超级群使用，其他会话类型传 null 即可。
     * @param draft     草稿的文字内容。
     * @return 当次接口操作的状态码。0 代表调用成功 具体结果需要实现接口回调，非 0 代表当前接口调用操作失败，不会触发接口回调，详细错误参考错误码
     * @listener [onDraftMessageSaved]
     */
    saveDraftMessage(type, targetId, channelId, draft) {
        return this._invokeMethod('saveDraftMessage', { type, targetId, channelId, draft });
    }
    /**
     * 获取会话中的草稿信息。
     * @param type      会话类型
     * @param targetId  会话 ID
     * @param channelId 频道 ID，仅支持超级群使用，其他会话类型传 null 即可。
     * @return 当次接口操作的状态码。0 代表调用成功 具体结果需要实现接口回调，非 0 代表当前接口调用操作失败，不会触发接口回调，详细错误参考错误码
     * @listener [onDraftMessageLoaded]
     */
    loadDraftMessage(type, targetId, channelId) {
        return this._invokeMethod('loadDraftMessage', { type, targetId, channelId });
    }
    /**
     * 删除指定会话中的草稿信息。
     * @param type      会话类型
     * @param targetId  会话 ID
     * @param channelId 频道 ID，仅支持超级群使用，其他会话类型传 null 即可。
     * @return 当次接口操作的状态码。0 代表调用成功 具体结果需要实现接口回调，非 0 代表当前接口调用操作失败，不会触发接口回调，详细错误参考错误码
     * @listener [onDraftMessageCleared]
     */
    clearDraftMessage(type, targetId, channelId) {
        return this._invokeMethod('clearDraftMessage', { type, targetId, channelId });
    }
    /**
     * 获取免打扰的会话列表。
     * @param conversationTypes 会话类型集合
     * @param channelId         频道 ID，仅支持超级群使用，其他会话类型传 null 即可。
     * @return 当次接口操作的状态码。0 代表调用成功 具体结果需要实现接口回调，非 0 代表当前接口调用操作失败，不会触发接口回调，详细错误参考错误码
     * @listener [onBlockedConversationsLoaded]
     */
    loadBlockedConversations(conversationTypes, channelId) {
        return this._invokeMethod('loadBlockedConversations', { conversationTypes, channelId });
    }
    /**
     * 设置会话的置顶状态。若会话不存在，调用此方法 SDK 自动创建会话并置顶。
     * @param type      会话类型
     * @param targetId  会话 ID
     * @param channelId 频道 ID，仅支持超级群使用，其他会话类型传 null 即可。
     * @param top       是否置顶
     * @return 当次接口操作的状态码。0 代表调用成功 具体结果需要实现接口回调，非 0 代表当前接口调用操作失败，不会触发接口回调，详细错误参考错误码
     * @listener [onConversationTopStatusChanged]
     */
    changeConversationTopStatus(type, targetId, channelId, top) {
        return this._invokeMethod('changeConversationTopStatus', { type, targetId, channelId, top });
    }
    /**
     * 获取会话的置顶状态
     * @param type      会话类型
     * @param targetId  会话 ID
     * @param channelId 频道 ID，仅支持超级群使用，其他会话类型传 null 即可。
     * @return 当次接口操作的状态码。0 代表调用成功 具体结果需要实现接口回调，非 0 代表当前接口调用操作失败，不会触发接口回调，详细错误参考错误码
     * @listener [onConversationTopStatusLoaded]
     */
    loadConversationTopStatus(type, targetId, channelId) {
        return this._invokeMethod('loadConversationTopStatus', { type, targetId, channelId });
    }
    /**
     * 同步会话阅读状态。
     * @param type      会话类型
     * @param targetId  会话 ID
     * @param channelId 频道 ID，仅支持超级群使用，其他会话类型传 null 即可。
     * @param timestamp 会话中已读的最后一条消息的发送时间戳
     * @return 当次接口操作的状态码。0 代表调用成功 具体结果需要实现接口回调，非 0 代表当前接口调用操作失败，不会触发接口回调，详细错误参考错误码
     * @listener [onConversationReadStatusSynced]
     */
    syncConversationReadStatus(type, targetId, channelId, timestamp) {
        return this._invokeMethod('syncConversationReadStatus', { type, targetId, channelId, timestamp });
    }
    /**
     * 向会话中发送正在输入的状态，目前只支持单聊。
     * @param type        会话类型
     * @param targetId    会话 ID
     * @param channelId   频道 ID，仅支持超级群使用，其他会话类型传 null 即可。
     * @param currentType 当前的状态
     * @return 当次接口操作的状态码。0 代表调用成功 具体结果需要实现接口回调，非 0 代表当前接口调用操作失败，不会触发接口回调，详细错误参考错误码
     */
    sendTypingStatus(type, targetId, channelId, currentType) {
        return this._invokeMethod('sendTypingStatus', { type, targetId, channelId, currentType });
    }
    /**
     * 加载历史消息
     * @param type      会话类型
     * @param targetId  会话 ID
     * @param channelId 频道 ID，仅支持超级群使用，其他会话类型传 null 即可。
     * @param sentTime  当前消息时间戳
     * @param order     获取消息的方向。BEFORE：获取 sentTime 之前的消息 （时间递减），AFTER：获取 sentTime 之后的消息 （时间递增）
     * @param policy    消息的加载策略。LOCAL：只加载本地，REMOTE：只加载远端，LOCAL_REMOTE：本地远端都加载
     * @param count     获取的消息数量，0 < count <= 20
     * @return 当次接口操作的状态码。0 代表调用成功 具体结果需要实现接口回调，非 0 代表当前接口调用操作失败，不会触发接口回调，详细错误参考错误码
     * @listener [onMessagesLoaded]
     */
    loadMessages(type, targetId, channelId, sentTime, order, policy, count) {
        return this._invokeMethod('loadMessages', {
            type,
            targetId,
            channelId,
            sentTime,
            order,
            policy,
            count,
        });
    }
    /**
     * 获取第一条未读消息。
     * @param type      会话类型
     * @param targetId  会话 ID
     * @param channelId 频道 ID，仅支持超级群使用，其他会话类型传 null 即可。
     * @return 当次接口操作的状态码。0 代表调用成功 具体结果需要实现接口回调，非 0 代表当前接口调用操作失败，不会触发接口回调，详细错误参考错误码
     * @listener [onFirstUnreadMessageLoaded]
     */
    loadFirstUnreadMessage(type, targetId, channelId) {
        return this._invokeMethod('loadFirstUnreadMessage', { type, targetId, channelId });
    }
    /**
     * 获取会话中未读的 @ 消息。
     * @param type      会话类型
     * @param targetId  会话 ID
     * @param channelId 频道 ID，仅支持超级群使用，其他会话类型传 null 即可。
     * @return 当次接口操作的状态码。0 代表调用成功 具体结果需要实现接口回调，非 0 代表当前接口调用操作失败，不会触发接口回调，详细错误参考错误码
     * @listener [onUnreadMentionedMessagesLoaded]
     */
    loadUnreadMentionedMessages(type, targetId, channelId) {
        return this._invokeMethod('loadUnreadMentionedMessages', { type, targetId, channelId });
    }
    /**
     * 插入一条消息
     * @param message 插入的消息
     * @return 当次接口操作的状态码。0 代表调用成功 具体结果需要实现接口回调，非 0 代表当前接口调用操作失败，不会触发接口回调，详细错误参考错误码
     * @listener [onMessageInserted]
     */
    insertMessage(message) {
        return this._invokeMethod('insertMessage', { message });
    }
    /**
     * 插入多条消息，不支持超级群
     * @param messages 插入的消息集合
     * @return 当次接口操作的状态码。0 代表调用成功 具体结果需要实现接口回调，非 0 代表当前接口调用操作失败，不会触发接口回调，详细错误参考错误码
     * @listener [onMessagesInserted]
     */
    insertMessages(messages) {
        return this._invokeMethod('insertMessages', { messages });
    }
    /**
     * @param type      会话类型
     * @param targetId  会话 ID
     * @param channelId 频道 ID，仅支持超级群使用，其他会话类型传 null 即可。
     * @param timestamp 清除消息截止时间戳，0 <= recordTime <= 当前会话最后一条消息的 sentTime, 0 清除所有消息，其他值清除小于等于 recordTime 的消息
     * @param policy    清除的策略
     * @return 当次接口操作的状态码。0 代表调用成功 具体结果需要实现接口回调，非 0 代表当前接口调用操作失败，不会触发接口回调，详细错误参考错误码
     * @listener [onMessageCleared]
     */
    clearMessages(type, targetId, channelId, timestamp, policy) {
        return this._invokeMethod('clearMessages', { type, targetId, channelId, timestamp, policy });
    }
    /**
     * @param messages 消息集合
     * @return 当次接口操作的状态码。0 代表调用成功 具体结果需要实现接口回调，非 0 代表当前接口调用操作失败，不会触发接口回调，详细错误参考错误码
     * @listener [onLocalMessagesDeleted]
     */
    deleteLocalMessages(messages) {
        return this._invokeMethod('deleteLocalMessages', { messages });
    }
    /**
     * @param type      会话类型
     * @param targetId  会话 ID
     * @param channelId 频道 ID，仅支持超级群使用，其他会话类型传 null 即可。
     * @param messages  消息集合
     * @return 当次接口操作的状态码。0 代表调用成功 具体结果需要实现接口回调，非 0 代表当前接口调用操作失败，不会触发接口回调，详细错误参考错误码
     * @listener [onMessagesDeleted]
     */
    deleteMessages(type, targetId, channelId, messages) {
        return this._invokeMethod('deleteMessages', { type, targetId, channelId, messages });
    }
    /**
     * @param message 需要被撤回的消息
     * @return 当次接口操作的状态码。0 代表调用成功 具体结果需要实现接口回调，非 0 代表当前接口调用操作失败，不会触发接口回调，详细错误参考错误码
     * @listener [onMessageRecalled]
     */
    recallMessage(message) {
        return this._invokeMethod('recallMessage', { message });
    }
    /**
     * 发送某个会话中的消息阅读回执
     * @param targetId  会话 ID
     * @param channelId 频道 ID，仅支持超级群使用，其他会话类型传 null 即可。
     * @param timestamp 该会话中已读的最后一条消息的发送时间戳
     * @return 当次接口操作的状态码。0 代表调用成功 具体结果需要实现接口回调，非 0 代表当前接口调用操作失败，不会触发接口回调，详细错误参考错误码
     * @listener [onPrivateReadReceiptMessageSent]
     */
    sendPrivateReadReceiptMessage(targetId, channelId, timestamp) {
        return this._invokeMethod('sendPrivateReadReceiptMessage', { targetId, channelId, timestamp });
    }
    /**
     * 发起消息已读回执请求
     * @param message 需要请求已读回执的消息
     * @return 当次接口操作的状态码。0 代表调用成功 具体结果需要实现接口回调，非 0 代表当前接口调用操作失败，不会触发接口回调，详细错误参考错误码
     * @listener [onGroupReadReceiptRequestSent]
     */
    sendGroupReadReceiptRequest(message) {
        return this._invokeMethod('sendGroupReadReceiptRequest', { message });
    }
    /**
     * 发送已读回执
     * @param targetId  会话 ID
     * @param channelId 频道 ID，仅支持超级群使用，其他会话类型传 null 即可。
     * @param messages  会话中需要发送已读回执的消息列表
     * @return 当次接口操作的状态码。0 代表调用成功 具体结果需要实现接口回调，非 0 代表当前接口调用操作失败，不会触发接口回调，详细错误参考错误码
     * @listener [onGroupReadReceiptResponseSent]
     */
    sendGroupReadReceiptResponse(targetId, channelId, messages) {
        return this._invokeMethod('sendGroupReadReceiptResponse', { targetId, channelId, messages });
    }
    /**
     * 更新消息扩展信息
     * 每条消息携带扩展信息键值对最大值 300个，单次设置扩展信息键值对最大值 20个
     * @param messageUId 消息的 messageUid，可在消息对象中获取，且只有发送成功的消息才会有值
     * @param expansion  要更新的消息扩展信息键值对，类型是 HashMap；Key 支持大小写英文字母、数字、部分特殊符号 + = - _ 的组合方式，不支持汉字。Value 可以输入空格
     * @return 当次接口操作的状态码。0 代表调用成功 具体结果需要实现接口回调，非 0 代表当前接口调用操作失败，不会触发接口回调，详细错误参考错误码
     * @listener [onMessageExpansionUpdated]
     */
    updateMessageExpansion(messageUId, expansion) {
        return this._invokeMethod('updateMessageExpansion', { messageUId, expansion });
    }
    /**
     * 删除消息扩展信息中特定的键值对
     * @param messageUId 消息的 messageUid，可在消息对象中获取，且只有发送成功的消息才会有值
     * @param keys       消息扩展信息中待删除的 key 的列表，类型是 ArrayList
     * @return 当次接口操作的状态码。0 代表调用成功 具体结果需要实现接口回调，非 0 代表当前接口调用操作失败，不会触发接口回调，详细错误参考错误码
     * @listener [onMessageExpansionForKeysRemoved]
     */
    removeMessageExpansionForKeys(messageUId, keys) {
        return this._invokeMethod('removeMessageExpansionForKeys', { messageUId, keys });
    }
    /**
     * 设置消息发送状态。
     * @param messageId  消息的 messageId，可在消息对象中获取
     * @param sentStatus 要修改的状态
     * @return 当次接口操作的状态码。0 代表调用成功 具体结果需要实现接口回调，非 0 代表当前接口调用操作失败，不会触发接口回调，详细错误参考错误码
     * @listener [onMessageSentStatusChanged]
     */
    changeMessageSentStatus(messageId, sentStatus) {
        return this._invokeMethod('changeMessageSentStatus', { messageId, sentStatus });
    }
    /**
     * @param messageId      消息的 messageId，可在消息对象中获取
     * @param receivedStatus 要修改的状态
     * @return 当次接口操作的状态码。0 代表调用成功 具体结果需要实现接口回调，非 0 代表当前接口调用操作失败，不会触发接口回调，详细错误参考错误码
     * @listener [onMessageReceiveStatusChanged]
     */
    changeMessageReceiveStatus(messageId, receivedStatus) {
        return this._invokeMethod('changeMessageReceiveStatus', { messageId, receivedStatus });
    }
    /**
     * 加入聊天室。
     * @param targetId     会话 ID
     * @param messageCount 进入聊天室拉取消息数目，-1 时不拉取任何消息，0 时拉取 10 条消息，最多只能拉取 50
     * @param autoCreate   是否创建聊天室，TRUE 如果聊天室不存在，sdk 会创建聊天室并加入，如果已存在，则直接加入
     * @return 当次接口操作的状态码。0 代表调用成功 具体结果需要实现接口回调，非 0 代表当前接口调用操作失败，不会触发接口回调，详细错误参考错误码
     * @listener [onChatRoomJoined]
     */
    joinChatRoom(targetId, messageCount, autoCreate) {
        return this._invokeMethod('joinChatRoom', { targetId, messageCount, autoCreate });
    }
    /**
     * 退出聊天室。
     * @param targetId 会话 ID
     * @return 当次接口操作的状态码。0 代表调用成功 具体结果需要实现接口回调，非 0 代表当前接口调用操作失败，不会触发接口回调，详细错误参考错误码
     * @listener [onChatRoomLeft]
     */
    leaveChatRoom(targetId) {
        return this._invokeMethod('leaveChatRoom', { targetId });
    }
    /**
     * 获取聊天室历史消息记录。
     * 注：必须先开通聊天室消息云存储功能。
     * @param targetId  会话 ID
     * @param timestamp 起始的消息发送时间戳
     * @param order     拉取顺序 0:倒序，1:正序
     * @param count     要获取的消息数量，0 < count <= 50。
     * @return 当次接口操作的状态码。0 代表调用成功 具体结果需要实现接口回调，非 0 代表当前接口调用操作失败，不会触发接口回调，详细错误参考错误码
     * @listener [onChatRoomMessagesLoaded]
     */
    loadChatRoomMessages(targetId, timestamp, order, count) {
        return this._invokeMethod('loadChatRoomMessages', { targetId, timestamp, order, count });
    }
    /**
     * 设置聊天室自定义属性。
     * @param targetId       会话 ID
     * @param key            聊天室属性名称，Key 支持大小写英文字母、数字、部分特殊符号 + = - _ 的组合方式，最大长度 128 个字符
     * @param value          聊天室属性对应的值，最大长度 4096 个字符
     * @param deleteWhenLeft 用户掉线或退出时，是否自动删除该 Key、Value 值
     * @param overwrite      如果当前 key 存在，是否进行覆盖
     * @return 当次接口操作的状态码。0 代表调用成功 具体结果需要实现接口回调，非 0 代表当前接口调用操作失败，不会触发接口回调，详细错误参考错误码
     * @listener [onChatRoomEntryAdded]
     */
    addChatRoomEntry(targetId, key, value, deleteWhenLeft, overwrite) {
        return this._invokeMethod('addChatRoomEntry', { targetId, key, value, deleteWhenLeft, overwrite });
    }
    /**
     * 批量设置聊天室自定义属性
     * @param targetId       会话 ID
     * @param entries        聊天室属性
     * @param deleteWhenLeft 用户掉线或退出时，是否自动删除该 Key、Value 值
     * @param overwrite      是否强制覆盖
     * @return 当次接口操作的状态码。0 代表调用成功 具体结果需要实现接口回调，非 0 代表当前接口调用操作失败，不会触发接口回调，详细错误参考错误码
     * @listener [onChatRoomEntriesAdded]
     */
    addChatRoomEntries(targetId, entries, deleteWhenLeft, overwrite) {
        return this._invokeMethod('addChatRoomEntries', { targetId, entries, deleteWhenLeft, overwrite });
    }
    /**
     * 获取聊天室单个属性。
     * @param targetId 会话 ID
     * @param key      聊天室属性键值
     * @return 当次接口操作的状态码。0 代表调用成功 具体结果需要实现接口回调，非 0 代表当前接口调用操作失败，不会触发接口回调，详细错误参考错误码
     * @listener [onChatRoomEntryLoaded]
     */
    loadChatRoomEntry(targetId, key) {
        return this._invokeMethod('loadChatRoomEntry', { targetId, key });
    }
    /**
     * 获取聊天室所有属性。
     * @param targetId 会话 ID
     * @return 当次接口操作的状态码。0 代表调用成功 具体结果需要实现接口回调，非 0 代表当前接口调用操作失败，不会触发接口回调，详细错误参考错误码
     * @listener [onAllChatRoomEntriesLoaded]
     */
    loadAllChatRoomEntries(targetId) {
        return this._invokeMethod('loadAllChatRoomEntries', { targetId });
    }
    /**
     * 删除聊天室自定义属性。
     * @param targetId 会话 ID
     * @param key      聊天室属性键值
     * @param force    是否强制删除
     * @return 当次接口操作的状态码。0 代表调用成功 具体结果需要实现接口回调，非 0 代表当前接口调用操作失败，不会触发接口回调，详细错误参考错误码
     * @listener [onChatRoomEntryRemoved]
     */
    removeChatRoomEntry(targetId, key, force) {
        return this._invokeMethod('removeChatRoomEntry', { targetId, key, force });
    }
    /**
     * 批量删除聊天室自定义属性
     * @param targetId 会话 ID
     * @param keys     聊天室属性
     * @param force    是否强制覆盖
     * @return 当次接口操作的状态码。0 代表调用成功 具体结果需要实现接口回调，非 0 代表当前接口调用操作失败，不会触发接口回调，详细错误参考错误码
     * @listener [onChatRoomEntriesRemoved]
     */
    removeChatRoomEntries(targetId, keys, force) {
        return this._invokeMethod('removeChatRoomEntries', { targetId, keys, force });
    }
    /**
     * 将某个用户加入黑名单。
     * 当你把对方加入黑名单后，对方再发消息时，就会提示“已被加入黑名单，消息发送失败”。 但你依然可以发消息个对方。
     * @param userId 用户 Id
     * @return 当次接口操作的状态码。0 代表调用成功 具体结果需要实现接口回调，非 0 代表当前接口调用操作失败，不会触发接口回调，详细错误参考错误码
     * @listener [onBlacklistAdded]
     */
    addToBlacklist(userId) {
        return this._invokeMethod('addToBlacklist', { userId });
    }
    /**
     * 将某个用户从黑名单中移出。
     * @param userId 用户 Id
     * @return 当次接口操作的状态码。0 代表调用成功 具体结果需要实现接口回调，非 0 代表当前接口调用操作失败，不会触发接口回调，详细错误参考错误码
     * @listener [onBlacklistRemoved]
     */
    removeFromBlacklist(userId) {
        return this._invokeMethod('removeFromBlacklist', { userId });
    }
    /**
     * 获取某用户是否在黑名单中。
     * @param userId 用户 Id
     * @return 当次接口操作的状态码。0 代表调用成功 具体结果需要实现接口回调，非 0 代表当前接口调用操作失败，不会触发接口回调，详细错误参考错误码
     * @listener [onBlacklistStatusLoaded]
     */
    loadBlacklistStatus(userId) {
        return this._invokeMethod('loadBlacklistStatus', { userId });
    }
    /**
     * 获取当前用户设置的黑名单列表。
     * @return 当次接口操作的状态码。0 代表调用成功 具体结果需要实现接口回调，非 0 代表当前接口调用操作失败，不会触发接口回调，详细错误参考错误码
     * @listener [onBlacklistLoaded]
     */
    loadBlacklist() {
        return this._invokeMethod('loadBlacklist', {});
    }
    /**
     * 根据关键字搜索指定会话中的消息。
     * @param type      会话类型
     * @param targetId  会话 ID
     * @param channelId 频道 ID，仅支持超级群使用，其他会话类型传 null 即可。
     * @param keyword   搜索的关键字
     * @param startTime 查询 beginTime 之前的消息， 传 0 时从最新消息开始搜索，从该时间往前搜索。
     * @param count     查询的数量，0 < count <= 50。
     * @return 当次接口操作的状态码。0 代表调用成功 具体结果需要实现接口回调，非 0 代表当前接口调用操作失败，不会触发接口回调，详细错误参考错误码
     * @listener [onMessagesSearched]
     */
    searchMessages(type, targetId, channelId, keyword, startTime, count) {
        return this._invokeMethod('searchMessages', { type, targetId, channelId, keyword, startTime, count });
    }
    /**
     * 根据关键字搜索指定会话中某个时间段的消息。
     * @param type      会话类型
     * @param targetId  会话 ID
     * @param channelId 频道 ID，仅支持超级群使用，其他会话类型传 null 即可。
     * @param keyword   搜索的关键字
     * @param startTime 开始时间
     * @param endTime   结束时间
     * @param offset    偏移量
     * @param count     返回的搜索结果数量，0 < count <= 50。
     * @return 当次接口操作的状态码。0 代表调用成功 具体结果需要实现接口回调，非 0 代表当前接口调用操作失败，不会触发接口回调，详细错误参考错误码
     * @listener [onMessagesSearchedByTimeRange]
     */
    searchMessagesByTimeRange(type, targetId, channelId, keyword, startTime, endTime, offset, count) {
        return this._invokeMethod('searchMessagesByTimeRange', {
            type,
            targetId,
            channelId,
            keyword,
            startTime,
            endTime,
            offset,
            count,
        });
    }
    /**
     * 根据用户 id 搜索指定会话中的消息。
     * @param userId    用户 id
     * @param type      会话类型
     * @param targetId  会话 ID
     * @param channelId 频道 ID，仅支持超级群使用，其他会话类型传 null 即可。
     * @param startTime 查询记录的起始时间， 传 0 时从最新消息开始搜索，从该时间往前搜索。
     * @param count     返回的搜索结果数量 0 < count <= 50。
     * @return 当次接口操作的状态码。0 代表调用成功 具体结果需要实现接口回调，非 0 代表当前接口调用操作失败，不会触发接口回调，详细错误参考错误码
     * @listener [onMessagesSearchedByUserId]
     */
    searchMessagesByUserId(userId, type, targetId, channelId, startTime, count) {
        return this._invokeMethod('searchMessagesByUserId', {
            userId,
            type,
            targetId,
            channelId,
            startTime,
            count,
        });
    }
    /**
     * 根据关键字搜索会话。
     * @param conversationTypes 会话类型集合
     * @param channelId         频道 ID，仅支持超级群使用，其他会话类型传 null 即可。
     * @param messageTypes      搜索的消息类型
     * @param keyword           搜索的关键字。
     * @return 当次接口操作的状态码。0 代表调用成功 具体结果需要实现接口回调，非 0 代表当前接口调用操作失败，不会触发接口回调，详细错误参考错误码
     * @listener [onConversationsSearched]
     */
    searchConversations(conversationTypes, channelId, messageTypes, keyword) {
        return this._invokeMethod('searchConversations', {
            conversationTypes,
            channelId,
            messageTypes,
            keyword,
        });
    }
    /**
     * 屏蔽某个时间段的消息提醒
     * @param startTime 开始消息免打扰时间，格式为 HH:MM:SS
     * @param spanMins  需要消息免打扰分钟数，0 < spanMins < 1440（ 比如，您设置的起始时间是 00：00， 结束时间为 01:00，则 spanMins 为 60 分钟。设置为 1439 代表全天免打扰 （23  60 + 59 = 1439 ））
     * @param level     消息通知级别
     * @return 当次接口操作的状态码。0 代表调用成功 具体结果需要实现接口回调，非 0 代表当前接口调用操作失败，不会触发接口回调，详细错误参考错误码
     * @listener [onNotificationQuietHoursChanged]
     */
    changeNotificationQuietHours(startTime, spanMins, level) {
        return this._invokeMethod('changeNotificationQuietHours', { startTime, spanMins, level });
    }
    /**
     * 删除已设置的全局时间段消息提醒屏蔽
     * @return 当次接口操作的状态码。0 代表调用成功 具体结果需要实现接口回调，非 0 代表当前接口调用操作失败，不会触发接口回调，详细错误参考错误码
     */
    removeNotificationQuietHours() {
        return this._invokeMethod('removeNotificationQuietHours', {});
    }
    /**
     * 查询已设置的时间段消息提醒屏蔽
     * @return 当次接口操作的状态码。0 代表调用成功 具体结果需要实现接口回调，非 0 代表当前接口调用操作失败，不会触发接口回调，详细错误参考错误码
     */
    loadNotificationQuietHours() {
        return this._invokeMethod('loadNotificationQuietHours', {});
    }
    /**
     * 设置会话的消息提醒状态
     * 注：超级群调用该接口，channelId 为空时，相当于设置了 channelId 为空的频道的免打扰，不会屏蔽整个超级群会话下所有频道的免打扰
     * @param type      会话类型
     * @param targetId  会话 ID
     * @param channelId 频道 ID，仅支持超级群使用，其他会话类型传 null 即可。
     * @param level     消息通知级别
     * @return 当次接口操作的状态码。0 代表调用成功 具体结果需要实现接口回调，非 0 代表当前接口调用操作失败，不会触发接口回调，详细错误参考错误码
     * @listener [onConversationNotificationLevelChanged]
     */
    changeConversationNotificationLevel(type, targetId, channelId, level) {
        return this._invokeMethod('changeConversationNotificationLevel', { type, targetId, channelId, level });
    }
    /**
     * 获取会话的消息提醒状态
     * @param type      会话类型
     * @param targetId  会话 ID
     * @param channelId 频道 ID，仅支持超级群使用，其他会话类型传 null 即可。
     * @return 当次接口操作的状态码。0 代表调用成功 具体结果需要实现接口回调，非 0 代表当前接口调用操作失败，不会触发接口回调，详细错误参考错误码
     * @listener [onConversationNotificationLevelLoaded]
     */
    loadConversationNotificationLevel(type, targetId, channelId) {
        return this._invokeMethod('loadConversationNotificationLevel', { type, targetId, channelId });
    }
    /**
     * 设置会话类型的消息提醒状态
     * 注：如要移除消息提醒状态，设置level为RCIMIWPushNotificationLevelDefault
     * @param type  会话类型
     * @param level 消息通知级别
     * @return 当次接口操作的状态码。0 代表调用成功 具体结果需要实现接口回调，非 0 代表当前接口调用操作失败，不会触发接口回调，详细错误参考错误码
     * @listener [onConversationTypeNotificationLevelChanged]
     */
    changeConversationTypeNotificationLevel(type, level) {
        return this._invokeMethod('changeConversationTypeNotificationLevel', { type, level });
    }
    /**
     * 获取会话类型的消息提醒状态
     * @param type 会话类型
     * @return [onConversationTypeNotificationLevelLoaded]
     */
    loadConversationTypeNotificationLevel(type) {
        return this._invokeMethod('loadConversationTypeNotificationLevel', { type });
    }
    /**
     * 设置超级群的默认消息状态
     * 一般由管理员设置的接口，针对超级群的所有群成员生效，针对超级群下所有频道生效，优先级较低。如果群成员自己超级群的免打扰级别，那么以群成员自己设置的为准。
     * @param targetId 会话 ID
     * @param level    消息通知级别
     * @return 当次接口操作的状态码。0 代表调用成功 具体结果需要实现接口回调，非 0 代表当前接口调用操作失败，不会触发接口回调，详细错误参考错误码
     * @listener [onUltraGroupDefaultNotificationLevelChanged]
     */
    changeUltraGroupDefaultNotificationLevel(targetId, level) {
        return this._invokeMethod('changeUltraGroupDefaultNotificationLevel', { targetId, level });
    }
    /**
     * 获取超级群的默认消息状态
     * @param targetId 会话 ID
     * @return 当次接口操作的状态码。0 代表调用成功 具体结果需要实现接口回调，非 0 代表当前接口调用操作失败，不会触发接口回调，详细错误参考错误码
     * @listener [onUltraGroupDefaultNotificationLevelLoaded]
     */
    loadUltraGroupDefaultNotificationLevel(targetId) {
        return this._invokeMethod('loadUltraGroupDefaultNotificationLevel', { targetId });
    }
    /**
     * 设置超级群频道的默认消息状态
     * @param targetId  会话 ID
     * @param channelId 频道 ID，仅支持超级群使用，其他会话类型传 null 即可。
     * @param level     消息通知级别
     * @return 当次接口操作的状态码。0 代表调用成功 具体结果需要实现接口回调，非 0 代表当前接口调用操作失败，不会触发接口回调，详细错误参考错误码
     * @listener [onUltraGroupChannelDefaultNotificationLevelChanged]
     */
    changeUltraGroupChannelDefaultNotificationLevel(targetId, channelId, level) {
        return this._invokeMethod('changeUltraGroupChannelDefaultNotificationLevel', {
            targetId,
            channelId,
            level,
        });
    }
    /**
     * 获取超级群频道的默认消息状态
     * @param targetId  会话 ID
     * @param channelId 频道 ID，仅支持超级群使用。
     * @return 当次接口操作的状态码。0 代表调用成功 具体结果需要实现接口回调，非 0 代表当前接口调用操作失败，不会触发接口回调，详细错误参考错误码
     * @listener [onUltraGroupChannelDefaultNotificationLevelLoaded]
     */
    loadUltraGroupChannelDefaultNotificationLevel(targetId, channelId) {
        return this._invokeMethod('loadUltraGroupChannelDefaultNotificationLevel', { targetId, channelId });
    }
    /**
     * 设置是否显示远程推送内容详情，此功能需要从服务端开启用户设置功能。
     * @param showContent 是否显示远程推送内容
     * @return 当次接口操作的状态码。0 代表调用成功 具体结果需要实现接口回调，非 0 代表当前接口调用操作失败，不会触发接口回调，详细错误参考错误码
     * @listener [onPushContentShowStatusChanged]
     */
    changePushContentShowStatus(showContent) {
        return this._invokeMethod('changePushContentShowStatus', { showContent });
    }
    /**
     * 设置推送语言
     * @param language 推送语言， 目前仅支持 en_us、zh_cn、ar_sa
     * @return 当次接口操作的状态码。0 代表调用成功 具体结果需要实现接口回调，非 0 代表当前接口调用操作失败，不会触发接口回调，详细错误参考错误码
     * @listener [onPushLanguageChanged]
     */
    changePushLanguage(language) {
        return this._invokeMethod('changePushLanguage', { language });
    }
    /**
     * 设置是否接收远程推送。
     * 前提：移动端未在线，Web 、MAC/PC 终端在线，移动端是否接收远程推送。
     * 此功能需要从服务端开启用户设置功能。
     * @param receive 是否接收
     * @return 当次接口操作的状态码。0 代表调用成功 具体结果需要实现接口回调，非 0 代表当前接口调用操作失败，不会触发接口回调，详细错误参考错误码
     * @listener [onPushReceiveStatusChanged]
     */
    changePushReceiveStatus(receive) {
        return this._invokeMethod('changePushReceiveStatus', { receive });
    }
    /**
     * 给指定的群成员发送消息
     * @param message 要发送的消息
     * @param userIds 群成员集合
     * @return 当次接口操作的状态码。0 代表调用成功 具体结果需要实现接口回调，非 0 代表当前接口调用操作失败，不会触发接口回调，详细错误参考错误码
     * @listener [onGroupMessageToDesignatedUsersAttached], [onGroupMessageToDesignatedUsersSent]
     */
    sendGroupMessageToDesignatedUsers(message, userIds) {
        return this._invokeMethod('sendGroupMessageToDesignatedUsers', { message, userIds });
    }
    /**
     * 获取指定会话的消息总数。
     * @param type      会话类型
     * @param targetId  会话 ID
     * @param channelId 频道 ID，仅支持超级群使用，其他会话类型传 null 即可。
     * @return 当次接口操作的状态码。0 代表调用成功 具体结果需要实现接口回调，非 0 代表当前接口调用操作失败，不会触发接口回调，详细错误参考错误码
     * @listener [onMessageCountLoaded]
     */
    loadMessageCount(type, targetId, channelId) {
        return this._invokeMethod('loadMessageCount', { type, targetId, channelId });
    }
    /**
     * 根据会话类型,获取置顶会话列表
     * @param conversationTypes 会话类型集合
     * @param channelId         频道 ID，仅支持超级群使用，其他会话类型传 null 即可。
     * @return 当次接口操作的状态码。0 代表调用成功 具体结果需要实现接口回调，非 0 代表当前接口调用操作失败，不会触发接口回调，详细错误参考错误码
     * @listener [onTopConversationsLoaded]
     */
    loadTopConversations(conversationTypes, channelId) {
        return this._invokeMethod('loadTopConversations', { conversationTypes, channelId });
    }
    /**
     * 上报超级群的已读时间
     * @param targetId  会话 ID
     * @param channelId 频道 ID，仅支持超级群使用，其他会话类型传 null 即可。
     * @param timestamp 已读时间
     * @return 当次接口操作的状态码。0 代表调用成功 具体结果需要实现接口回调，非 0 代表当前接口调用操作失败，不会触发接口回调，详细错误参考错误码
     * @listener [onUltraGroupReadStatusSynced]
     */
    syncUltraGroupReadStatus(targetId, channelId, timestamp) {
        return this._invokeMethod('syncUltraGroupReadStatus', { targetId, channelId, timestamp });
    }
    /**
     * 获取特定会话下所有频道的会话列表，只支持超级群
     * @param type     会话类型
     * @param targetId 会话 ID
     * @return 当次接口操作的状态码。0 代表调用成功 具体结果需要实现接口回调，非 0 代表当前接口调用操作失败，不会触发接口回调，详细错误参考错误码
     * @listener [onConversationsLoadedForAllChannel]
     */
    loadConversationsForAllChannel(type, targetId) {
        return this._invokeMethod('loadConversationsForAllChannel', { type, targetId });
    }
    /**
     * 修改消息
     * @param messageUId 消息的 messageUid，可在消息对象中获取，且只有发送成功的消息才会有值
     * @param message    要修改的 message
     * @return 当次接口操作的状态码。0 代表调用成功 具体结果需要实现接口回调，非 0 代表当前接口调用操作失败，不会触发接口回调，详细错误参考错误码
     * @listener [onUltraGroupMessageModified]
     */
    modifyUltraGroupMessage(messageUId, message) {
        return this._invokeMethod('modifyUltraGroupMessage', { messageUId, message });
    }
    /**
     * 撤回超级群消息
     * @param message      需要撤回的消息
     * @param deleteRemote 是否删除远端消息
     * @return 当次接口操作的状态码。0 代表调用成功 具体结果需要实现接口回调，非 0 代表当前接口调用操作失败，不会触发接口回调，详细错误参考错误码
     * @listener [onUltraGroupMessageRecalled]
     */
    recallUltraGroupMessage(message, deleteRemote) {
        return this._invokeMethod('recallUltraGroupMessage', { message, deleteRemote });
    }
    /**
     * 删除本地特定 channel 特点时间之前的消息
     * @param targetId  会话 ID
     * @param channelId 频道 ID，仅支持超级群使用，其他会话类型传 null 即可。
     * @param timestamp 时间戳
     * @param policy    清除策略
     * @return 当次接口操作的状态码。0 代表调用成功 具体结果需要实现接口回调，非 0 代表当前接口调用操作失败，不会触发接口回调，详细错误参考错误码
     * @listener [onUltraGroupMessagesCleared]
     */
    clearUltraGroupMessages(targetId, channelId, timestamp, policy) {
        return this._invokeMethod('clearUltraGroupMessages', { targetId, channelId, timestamp, policy });
    }
    /**
     * 发送超级群输入状态
     * @param targetId     会话 ID
     * @param channelId    频道 ID，仅支持超级群使用，其他会话类型传 null 即可。
     * @param typingStatus
     * @return 当次接口操作的状态码。0 代表调用成功 具体结果需要实现接口回调，非 0 代表当前接口调用操作失败，不会触发接口回调，详细错误参考错误码
     * @listener [onUltraGroupTypingStatusSent]
     */
    sendUltraGroupTypingStatus(targetId, channelId, typingStatus) {
        return this._invokeMethod('sendUltraGroupTypingStatus', { targetId, channelId, typingStatus });
    }
    /**
     * 删除本地所有 channel 特定时间之前的消息
     * @param targetId  会话 ID
     * @param timestamp 时间戳
     * @return 当次接口操作的状态码。0 代表调用成功 具体结果需要实现接口回调，非 0 代表当前接口调用操作失败，不会触发接口回调，详细错误参考错误码
     * @listener [onUltraGroupMessagesClearedForAllChannel]
     */
    clearUltraGroupMessagesForAllChannel(targetId, timestamp) {
        return this._invokeMethod('clearUltraGroupMessagesForAllChannel', { targetId, timestamp });
    }
    /**
     * 从服务获取批量消息
     * @param messages 获取的消息集合
     * @return 当次接口操作的状态码。0 代表调用成功 具体结果需要实现接口回调，非 0 代表当前接口调用操作失败，不会触发接口回调，详细错误参考错误码
     * @listener [onBatchRemoteUltraGroupMessagesLoaded]
     */
    loadBatchRemoteUltraGroupMessages(messages) {
        return this._invokeMethod('loadBatchRemoteUltraGroupMessages', { messages });
    }
    /**
     * 更新超级群消息扩展信息
     * @param messageUId 消息的 messageUid，可在消息对象中获取，且只有发送成功的消息才会有值
     * @param expansion  更新的消息扩展信息键值对，类型是 HashMap；Key 支持大小写英文字母、数字、部分特殊符号 + = - _ 的组合方式，不支持汉字。Value 可以输入空格。
     * @return 当次接口操作的状态码。0 代表调用成功 具体结果需要实现接口回调，非 0 代表当前接口调用操作失败，不会触发接口回调，详细错误参考错误码
     * @listener [onUltraGroupMessageExpansionUpdated]
     */
    updateUltraGroupMessageExpansion(messageUId, expansion) {
        return this._invokeMethod('updateUltraGroupMessageExpansion', { messageUId, expansion });
    }
    /**
     * 删除超级群消息扩展信息中特定的键值对
     * @param messageUId 消息的 messageUid，可在消息对象中获取，且只有发送成功的消息才会有值
     * @param keys       消息扩展信息中待删除的 key 的列表，类型是 ArrayList
     * @return 当次接口操作的状态码。0 代表调用成功 具体结果需要实现接口回调，非 0 代表当前接口调用操作失败，不会触发接口回调，详细错误参考错误码
     * @listener [onUltraGroupMessageExpansionRemoved]
     */
    removeUltraGroupMessageExpansion(messageUId, keys) {
        return this._invokeMethod('removeUltraGroupMessageExpansion', { messageUId, keys });
    }
    /**
     * 修改日志等级
     * @param level 日志级别
     * @return 当次接口操作的状态码。0 代表调用成功 具体结果需要实现接口回调，非 0 代表当前接口调用操作失败，不会触发接口回调，详细错误参考错误码
     */
    changeLogLevel(level) {
        return this._invokeMethod('changeLogLevel', { level });
    }
    /**
     * 收到消息的监听
     */
    setOnMessageReceivedListener(listener) {
        const eventName = 'IRCIMIWListener:onMessageReceived';
        this._setListener(eventName, listener);
    }
    /**
     * 网络状态变化
     */
    setOnConnectionStatusChangedListener(listener) {
        const eventName = 'IRCIMIWListener:onConnectionStatusChanged';
        this._setListener(eventName, listener);
    }
    /**
     * 会话状态置顶多端同步监听
     */
    setOnConversationTopStatusSyncedListener(listener) {
        const eventName = 'IRCIMIWListener:onConversationTopStatusSynced';
        this._setListener(eventName, listener);
    }
    /**
     * 撤回消息监听器
     */
    setOnRemoteMessageRecalledListener(listener) {
        const eventName = 'IRCIMIWListener:onRemoteMessageRecalled';
        this._setListener(eventName, listener);
    }
    /**
     * 单聊中收到消息回执的回调。
     */
    setOnPrivateReadReceiptReceivedListener(listener) {
        const eventName = 'IRCIMIWListener:onPrivateReadReceiptReceived';
        this._setListener(eventName, listener);
    }
    /**
     * 消息扩展信息更改的回调
     */
    setOnRemoteMessageExpansionUpdatedListener(listener) {
        const eventName = 'IRCIMIWListener:onRemoteMessageExpansionUpdated';
        this._setListener(eventName, listener);
    }
    /**
     * 消息扩展信息删除的回调
     */
    setOnRemoteMessageExpansionForKeyRemovedListener(listener) {
        const eventName = 'IRCIMIWListener:onRemoteMessageExpansionForKeyRemoved';
        this._setListener(eventName, listener);
    }
    /**
     * 聊天室用户进入、退出聊天室监听
     */
    setOnChatRoomMemberChangedListener(listener) {
        const eventName = 'IRCIMIWListener:onChatRoomMemberChanged';
        this._setListener(eventName, listener);
    }
    /**
     * 会话输入状态发生变化。对于单聊而言，当对方正在输入时，监听会触发一次；当对方不处于输入状态时，该监听还会触发一次，但回调里输入用户列表为空。
     */
    setOnTypingStatusChangedListener(listener) {
        const eventName = 'IRCIMIWListener:onTypingStatusChanged';
        this._setListener(eventName, listener);
    }
    /**
     * 同步消息未读状态监听接口。多端登录，收到其它端清除某一会话未读数通知的时候
     */
    setOnConversationReadStatusSyncMessageReceivedListener(listener) {
        const eventName = 'IRCIMIWListener:onConversationReadStatusSyncMessageReceived';
        this._setListener(eventName, listener);
    }
    /**
     * 聊天室 KV 同步完成的回调
     */
    setOnChatRoomEntriesSyncedListener(listener) {
        const eventName = 'IRCIMIWListener:onChatRoomEntriesSynced';
        this._setListener(eventName, listener);
    }
    /**
     * 聊天室 KV 发生变化的回调
     */
    setOnChatRoomEntriesChangedListener(listener) {
        const eventName = 'IRCIMIWListener:onChatRoomEntriesChanged';
        this._setListener(eventName, listener);
    }
    /**
     * 超级群消息 kv 被更新
     */
    setOnRemoteUltraGroupMessageExpansionUpdatedListener(listener) {
        const eventName = 'IRCIMIWListener:onRemoteUltraGroupMessageExpansionUpdated';
        this._setListener(eventName, listener);
    }
    /**
     * 超级群消息被更改
     */
    setOnRemoteUltraGroupMessageModifiedListener(listener) {
        const eventName = 'IRCIMIWListener:onRemoteUltraGroupMessageModified';
        this._setListener(eventName, listener);
    }
    /**
     * 超级群消息被撤回
     */
    setOnRemoteUltraGroupMessageRecalledListener(listener) {
        const eventName = 'IRCIMIWListener:onRemoteUltraGroupMessageRecalled';
        this._setListener(eventName, listener);
    }
    /**
     * 超级群已读的监听
     */
    setOnUltraGroupReadTimeReceivedListener(listener) {
        const eventName = 'IRCIMIWListener:onUltraGroupReadTimeReceived';
        this._setListener(eventName, listener);
    }
    /**
 * 用户输入状态变化的回调
      当客户端收到用户输入状态的变化时，会回调此接口，通知发生变化的会话以及当前正在输入的RCUltraGroupTypingStatusInfo列表
 */
    setOnUltraGroupTypingStatusChangedListener(listener) {
        const eventName = 'IRCIMIWListener:onUltraGroupTypingStatusChanged';
        this._setListener(eventName, listener);
    }
    /**
     * 发送含有敏感词消息被拦截的回调
     */
    setOnMessageBlockedListener(listener) {
        const eventName = 'IRCIMIWListener:onMessageBlocked';
        this._setListener(eventName, listener);
    }
    /**
     * 聊天室状态发生变化的监听
     */
    setOnChatRoomStatusChangedListener(listener) {
        const eventName = 'IRCIMIWListener:onChatRoomStatusChanged';
        this._setListener(eventName, listener);
    }
    /**
     * 收到群聊已读回执请求的监听
     */
    setOnGroupMessageReadReceiptRequestReceivedListener(listener) {
        const eventName = 'IRCIMIWListener:onGroupMessageReadReceiptRequestReceived';
        this._setListener(eventName, listener);
    }
    /**
     * 收到群聊已读回执响应的监听
     */
    setOnGroupMessageReadReceiptResponseReceivedListener(listener) {
        const eventName = 'IRCIMIWListener:onGroupMessageReadReceiptResponseReceived';
        this._setListener(eventName, listener);
    }
    /**
     * [connect] 的接口监听，收到链接结果的回调
     */
    setOnConnectedListener(listener) {
        const eventName = 'IRCIMIWListener:onConnected';
        this._setListener(eventName, listener);
    }
    /**
     * [connect] 的接口监听，数据库打开时发生的回调
     */
    setOnDatabaseOpenedListener(listener) {
        const eventName = 'IRCIMIWListener:onDatabaseOpened';
        this._setListener(eventName, listener);
    }
    /**
     * [loadConversation] 的接口监听
     */
    setOnConversationLoadedListener(listener) {
        const eventName = 'IRCIMIWListener:onConversationLoaded';
        this._setListener(eventName, listener);
    }
    /**
     * [loadConversations] 的接口监听
     */
    setOnConversationsLoadedListener(listener) {
        const eventName = 'IRCIMIWListener:onConversationsLoaded';
        this._setListener(eventName, listener);
    }
    /**
     * [removeConversation] 的接口监听
     */
    setOnConversationRemovedListener(listener) {
        const eventName = 'IRCIMIWListener:onConversationRemoved';
        this._setListener(eventName, listener);
    }
    /**
     * [removeConversations] 的接口监听
     */
    setOnConversationsRemovedListener(listener) {
        const eventName = 'IRCIMIWListener:onConversationsRemoved';
        this._setListener(eventName, listener);
    }
    /**
     * [loadTotalUnreadCount] 的接口监听
     */
    setOnTotalUnreadCountLoadedListener(listener) {
        const eventName = 'IRCIMIWListener:onTotalUnreadCountLoaded';
        this._setListener(eventName, listener);
    }
    /**
     * [loadUnreadCount] 的接口监听
     */
    setOnUnreadCountLoadedListener(listener) {
        const eventName = 'IRCIMIWListener:onUnreadCountLoaded';
        this._setListener(eventName, listener);
    }
    /**
     * [loadUnreadCountByConversationTypes] 的接口监听
     */
    setOnUnreadCountByConversationTypesLoadedListener(listener) {
        const eventName = 'IRCIMIWListener:onUnreadCountByConversationTypesLoaded';
        this._setListener(eventName, listener);
    }
    /**
     * [loadUnreadMentionedCount] 的接口监听
     */
    setOnUnreadMentionedCountLoadedListener(listener) {
        const eventName = 'IRCIMIWListener:onUnreadMentionedCountLoaded';
        this._setListener(eventName, listener);
    }
    /**
     * [loadUltraGroupAllUnreadMentionedCount] 的接口监听
     */
    setOnUltraGroupAllUnreadCountLoadedListener(listener) {
        const eventName = 'IRCIMIWListener:onUltraGroupAllUnreadCountLoaded';
        this._setListener(eventName, listener);
    }
    /**
     * [loadUltraGroupAllUnreadMentionedCount] 的接口监听
     */
    setOnUltraGroupAllUnreadMentionedCountLoadedListener(listener) {
        const eventName = 'IRCIMIWListener:onUltraGroupAllUnreadMentionedCountLoaded';
        this._setListener(eventName, listener);
    }
    /**
     * [clearUnreadCount] 的接口监听
     */
    setOnUnreadCountClearedListener(listener) {
        const eventName = 'IRCIMIWListener:onUnreadCountCleared';
        this._setListener(eventName, listener);
    }
    /**
     * [saveDraftMessage] 的接口监听
     */
    setOnDraftMessageSavedListener(listener) {
        const eventName = 'IRCIMIWListener:onDraftMessageSaved';
        this._setListener(eventName, listener);
    }
    /**
     * [clearDraftMessage] 的接口监听
     */
    setOnDraftMessageClearedListener(listener) {
        const eventName = 'IRCIMIWListener:onDraftMessageCleared';
        this._setListener(eventName, listener);
    }
    /**
     * [loadDraftMessage] 的接口监听
     */
    setOnDraftMessageLoadedListener(listener) {
        const eventName = 'IRCIMIWListener:onDraftMessageLoaded';
        this._setListener(eventName, listener);
    }
    /**
     * [loadBlockedConversations] 的接口监听
     */
    setOnBlockedConversationsLoadedListener(listener) {
        const eventName = 'IRCIMIWListener:onBlockedConversationsLoaded';
        this._setListener(eventName, listener);
    }
    /**
     * [changeConversationTopStatus] 的接口监听
     */
    setOnConversationTopStatusChangedListener(listener) {
        const eventName = 'IRCIMIWListener:onConversationTopStatusChanged';
        this._setListener(eventName, listener);
    }
    /**
     * [loadConversationTopStatus] 的接口监听
     */
    setOnConversationTopStatusLoadedListener(listener) {
        const eventName = 'IRCIMIWListener:onConversationTopStatusLoaded';
        this._setListener(eventName, listener);
    }
    /**
     * [syncConversationReadStatus] 的接口监听
     */
    setOnConversationReadStatusSyncedListener(listener) {
        const eventName = 'IRCIMIWListener:onConversationReadStatusSynced';
        this._setListener(eventName, listener);
    }
    /**
     * [sendMessage] 的接口监听
     */
    setOnMessageAttachedListener(listener) {
        const eventName = 'IRCIMIWListener:onMessageAttached';
        this._setListener(eventName, listener);
    }
    /**
     * [sendMessage] 的接口监听
     */
    setOnMessageSentListener(listener) {
        const eventName = 'IRCIMIWListener:onMessageSent';
        this._setListener(eventName, listener);
    }
    /**
     * [sendMediaMessage] 的接口监听
     */
    setOnMediaMessageAttachedListener(listener) {
        const eventName = 'IRCIMIWListener:onMediaMessageAttached';
        this._setListener(eventName, listener);
    }
    /**
     * [sendMediaMessage] 的接口监听
     */
    setOnMediaMessageSendingListener(listener) {
        const eventName = 'IRCIMIWListener:onMediaMessageSending';
        this._setListener(eventName, listener);
    }
    /**
     * [cancelSendingMediaMessage] 的接口监听
     */
    setOnSendingMediaMessageCanceledListener(listener) {
        const eventName = 'IRCIMIWListener:onSendingMediaMessageCanceled';
        this._setListener(eventName, listener);
    }
    /**
     * [sendMediaMessage] 的接口监听
     */
    setOnMediaMessageSentListener(listener) {
        const eventName = 'IRCIMIWListener:onMediaMessageSent';
        this._setListener(eventName, listener);
    }
    /**
     * [downloadMediaMessage] 的接口监听
     */
    setOnMediaMessageDownloadingListener(listener) {
        const eventName = 'IRCIMIWListener:onMediaMessageDownloading';
        this._setListener(eventName, listener);
    }
    /**
     * [downloadMediaMessage] 的接口监听
     */
    setOnMediaMessageDownloadedListener(listener) {
        const eventName = 'IRCIMIWListener:onMediaMessageDownloaded';
        this._setListener(eventName, listener);
    }
    /**
     * [cancelDownloadingMediaMessage] 的接口监听
     */
    setOnDownloadingMediaMessageCanceledListener(listener) {
        const eventName = 'IRCIMIWListener:onDownloadingMediaMessageCanceled';
        this._setListener(eventName, listener);
    }
    /**
     * [loadMessages] 的接口监听
     */
    setOnMessagesLoadedListener(listener) {
        const eventName = 'IRCIMIWListener:onMessagesLoaded';
        this._setListener(eventName, listener);
    }
    /**
     * [loadUnreadMentionedMessages] 的接口监听
     */
    setOnUnreadMentionedMessagesLoadedListener(listener) {
        const eventName = 'IRCIMIWListener:onUnreadMentionedMessagesLoaded';
        this._setListener(eventName, listener);
    }
    /**
     * [loadFirstUnreadMessage] 的接口监听
     */
    setOnFirstUnreadMessageLoadedListener(listener) {
        const eventName = 'IRCIMIWListener:onFirstUnreadMessageLoaded';
        this._setListener(eventName, listener);
    }
    /**
     * [insertMessage] 的接口监听
     */
    setOnMessageInsertedListener(listener) {
        const eventName = 'IRCIMIWListener:onMessageInserted';
        this._setListener(eventName, listener);
    }
    /**
     * [insertMessages] 的接口监听
     */
    setOnMessagesInsertedListener(listener) {
        const eventName = 'IRCIMIWListener:onMessagesInserted';
        this._setListener(eventName, listener);
    }
    /**
     * [clearMessages] 的接口监听
     */
    setOnMessageClearedListener(listener) {
        const eventName = 'IRCIMIWListener:onMessageCleared';
        this._setListener(eventName, listener);
    }
    /**
     * [deleteLocalMessages] 的接口监听
     */
    setOnLocalMessagesDeletedListener(listener) {
        const eventName = 'IRCIMIWListener:onLocalMessagesDeleted';
        this._setListener(eventName, listener);
    }
    /**
     * [deleteMessages] 的接口监听
     */
    setOnMessagesDeletedListener(listener) {
        const eventName = 'IRCIMIWListener:onMessagesDeleted';
        this._setListener(eventName, listener);
    }
    /**
     * [recallMessage] 的接口监听
     */
    setOnMessageRecalledListener(listener) {
        const eventName = 'IRCIMIWListener:onMessageRecalled';
        this._setListener(eventName, listener);
    }
    /**
     * [sendPrivateReadReceiptMessage] 的接口监听
     */
    setOnPrivateReadReceiptMessageSentListener(listener) {
        const eventName = 'IRCIMIWListener:onPrivateReadReceiptMessageSent';
        this._setListener(eventName, listener);
    }
    /**
     * [updateMessageExpansion] 的接口监听
     */
    setOnMessageExpansionUpdatedListener(listener) {
        const eventName = 'IRCIMIWListener:onMessageExpansionUpdated';
        this._setListener(eventName, listener);
    }
    /**
     * [removeMessageExpansionForKeys] 的接口监听
     */
    setOnMessageExpansionForKeysRemovedListener(listener) {
        const eventName = 'IRCIMIWListener:onMessageExpansionForKeysRemoved';
        this._setListener(eventName, listener);
    }
    /**
     * [changeMessageReceiveStatus] 的接口监听
     */
    setOnMessageReceiveStatusChangedListener(listener) {
        const eventName = 'IRCIMIWListener:onMessageReceiveStatusChanged';
        this._setListener(eventName, listener);
    }
    /**
     * [changeMessageSentStatus] 的接口监听
     */
    setOnMessageSentStatusChangedListener(listener) {
        const eventName = 'IRCIMIWListener:onMessageSentStatusChanged';
        this._setListener(eventName, listener);
    }
    /**
     * [joinChatRoom] 的接口监听
     */
    setOnChatRoomJoinedListener(listener) {
        const eventName = 'IRCIMIWListener:onChatRoomJoined';
        this._setListener(eventName, listener);
    }
    /**
     * 正在加入聊天室的回调
     */
    setOnChatRoomJoiningListener(listener) {
        const eventName = 'IRCIMIWListener:onChatRoomJoining';
        this._setListener(eventName, listener);
    }
    /**
     * [leaveChatRoom] 的接口监听
     */
    setOnChatRoomLeftListener(listener) {
        const eventName = 'IRCIMIWListener:onChatRoomLeft';
        this._setListener(eventName, listener);
    }
    /**
     * [loadChatRoomMessages] 的接口监听
     */
    setOnChatRoomMessagesLoadedListener(listener) {
        const eventName = 'IRCIMIWListener:onChatRoomMessagesLoaded';
        this._setListener(eventName, listener);
    }
    /**
     * [addChatRoomEntry] 的接口监听
     */
    setOnChatRoomEntryAddedListener(listener) {
        const eventName = 'IRCIMIWListener:onChatRoomEntryAdded';
        this._setListener(eventName, listener);
    }
    /**
     * [addChatRoomEntries] 的接口监听
     */
    setOnChatRoomEntriesAddedListener(listener) {
        const eventName = 'IRCIMIWListener:onChatRoomEntriesAdded';
        this._setListener(eventName, listener);
    }
    /**
     * [loadChatRoomEntry] 的接口监听
     */
    setOnChatRoomEntryLoadedListener(listener) {
        const eventName = 'IRCIMIWListener:onChatRoomEntryLoaded';
        this._setListener(eventName, listener);
    }
    /**
     * [loadAllChatRoomEntries] 的接口监听
     */
    setOnAllChatRoomEntriesLoadedListener(listener) {
        const eventName = 'IRCIMIWListener:onAllChatRoomEntriesLoaded';
        this._setListener(eventName, listener);
    }
    /**
     * [removeChatRoomEntry] 的接口监听
     */
    setOnChatRoomEntryRemovedListener(listener) {
        const eventName = 'IRCIMIWListener:onChatRoomEntryRemoved';
        this._setListener(eventName, listener);
    }
    /**
     * [removeChatRoomEntries] 的接口监听
     */
    setOnChatRoomEntriesRemovedListener(listener) {
        const eventName = 'IRCIMIWListener:onChatRoomEntriesRemoved';
        this._setListener(eventName, listener);
    }
    /**
     * [addToBlacklist] 的接口监听
     */
    setOnBlacklistAddedListener(listener) {
        const eventName = 'IRCIMIWListener:onBlacklistAdded';
        this._setListener(eventName, listener);
    }
    /**
     * [removeFromBlacklist] 的接口监听
     */
    setOnBlacklistRemovedListener(listener) {
        const eventName = 'IRCIMIWListener:onBlacklistRemoved';
        this._setListener(eventName, listener);
    }
    /**
     * [loadBlacklistStatus] 的接口监听
     */
    setOnBlacklistStatusLoadedListener(listener) {
        const eventName = 'IRCIMIWListener:onBlacklistStatusLoaded';
        this._setListener(eventName, listener);
    }
    /**
     * [loadBlacklist] 的接口监听
     */
    setOnBlacklistLoadedListener(listener) {
        const eventName = 'IRCIMIWListener:onBlacklistLoaded';
        this._setListener(eventName, listener);
    }
    /**
     * [searchMessages] 的接口监听
     */
    setOnMessagesSearchedListener(listener) {
        const eventName = 'IRCIMIWListener:onMessagesSearched';
        this._setListener(eventName, listener);
    }
    /**
     * [searchMessagesByTimeRange] 的接口监听
     */
    setOnMessagesSearchedByTimeRangeListener(listener) {
        const eventName = 'IRCIMIWListener:onMessagesSearchedByTimeRange';
        this._setListener(eventName, listener);
    }
    /**
     * [searchMessagesByUserId] 的接口监听
     */
    setOnMessagesSearchedByUserIdListener(listener) {
        const eventName = 'IRCIMIWListener:onMessagesSearchedByUserId';
        this._setListener(eventName, listener);
    }
    /**
     * [searchConversations] 的接口监听
     */
    setOnConversationsSearchedListener(listener) {
        const eventName = 'IRCIMIWListener:onConversationsSearched';
        this._setListener(eventName, listener);
    }
    /**
     * sendGroupReadReceiptRequest 的接口监听
     */
    setOnGroupReadReceiptRequestSentListener(listener) {
        const eventName = 'IRCIMIWListener:onGroupReadReceiptRequestSent';
        this._setListener(eventName, listener);
    }
    /**
     * [sendGroupReadReceiptResponse] 的接口监听
     */
    setOnGroupReadReceiptResponseSentListener(listener) {
        const eventName = 'IRCIMIWListener:onGroupReadReceiptResponseSent';
        this._setListener(eventName, listener);
    }
    /**
     * [changeNotificationQuietHours] 的接口回调
     */
    setOnNotificationQuietHoursChangedListener(listener) {
        const eventName = 'IRCIMIWListener:onNotificationQuietHoursChanged';
        this._setListener(eventName, listener);
    }
    /**
     * [removeNotificationQuietHours] 的接口回调
     */
    setOnNotificationQuietHoursRemovedListener(listener) {
        const eventName = 'IRCIMIWListener:onNotificationQuietHoursRemoved';
        this._setListener(eventName, listener);
    }
    /**
     * [loadNotificationQuietHours] 的接口回调
     */
    setOnNotificationQuietHoursLoadedListener(listener) {
        const eventName = 'IRCIMIWListener:onNotificationQuietHoursLoaded';
        this._setListener(eventName, listener);
    }
    /**
     * [changeConversationNotificationLevel] 的接口回调
     */
    setOnConversationNotificationLevelChangedListener(listener) {
        const eventName = 'IRCIMIWListener:onConversationNotificationLevelChanged';
        this._setListener(eventName, listener);
    }
    /**
     * [loadConversationNotificationLevel] 的接口回调
     */
    setOnConversationNotificationLevelLoadedListener(listener) {
        const eventName = 'IRCIMIWListener:onConversationNotificationLevelLoaded';
        this._setListener(eventName, listener);
    }
    /**
     * [changeConversationTypeNotificationLevel] 的接口回调
     */
    setOnConversationTypeNotificationLevelChangedListener(listener) {
        const eventName = 'IRCIMIWListener:onConversationTypeNotificationLevelChanged';
        this._setListener(eventName, listener);
    }
    /**
     * [loadConversationTypeNotificationLevel] 的接口回调
     */
    setOnConversationTypeNotificationLevelLoadedListener(listener) {
        const eventName = 'IRCIMIWListener:onConversationTypeNotificationLevelLoaded';
        this._setListener(eventName, listener);
    }
    /**
     * [changeUltraGroupDefaultNotificationLevel] 的接口回调
     */
    setOnUltraGroupDefaultNotificationLevelChangedListener(listener) {
        const eventName = 'IRCIMIWListener:onUltraGroupDefaultNotificationLevelChanged';
        this._setListener(eventName, listener);
    }
    /**
     * [loadUltraGroupDefaultNotificationLevel] 的接口回调
     */
    setOnUltraGroupDefaultNotificationLevelLoadedListener(listener) {
        const eventName = 'IRCIMIWListener:onUltraGroupDefaultNotificationLevelLoaded';
        this._setListener(eventName, listener);
    }
    /**
     * [changeUltraGroupChannelDefaultNotificationLevel] 的接口回调
     */
    setOnUltraGroupChannelDefaultNotificationLevelChangedListener(listener) {
        const eventName = 'IRCIMIWListener:onUltraGroupChannelDefaultNotificationLevelChanged';
        this._setListener(eventName, listener);
    }
    /**
     * [loadUltraGroupChannelDefaultNotificationLevel] 的接口回调
     */
    setOnUltraGroupChannelDefaultNotificationLevelLoadedListener(listener) {
        const eventName = 'IRCIMIWListener:onUltraGroupChannelDefaultNotificationLevelLoaded';
        this._setListener(eventName, listener);
    }
    /**
     * [changePushContentShowStatus] 的接口监听
     */
    setOnPushContentShowStatusChangedListener(listener) {
        const eventName = 'IRCIMIWListener:onPushContentShowStatusChanged';
        this._setListener(eventName, listener);
    }
    /**
     * [changePushLanguage] 的接口监听
     */
    setOnPushLanguageChangedListener(listener) {
        const eventName = 'IRCIMIWListener:onPushLanguageChanged';
        this._setListener(eventName, listener);
    }
    /**
     * [changePushReceiveStatus] 的接口监听
     */
    setOnPushReceiveStatusChangedListener(listener) {
        const eventName = 'IRCIMIWListener:onPushReceiveStatusChanged';
        this._setListener(eventName, listener);
    }
    /**
     * [loadMessageCount] 的接口监听
     */
    setOnMessageCountLoadedListener(listener) {
        const eventName = 'IRCIMIWListener:onMessageCountLoaded';
        this._setListener(eventName, listener);
    }
    /**
     *
     */
    setOnTopConversationsLoadedListener(listener) {
        const eventName = 'IRCIMIWListener:onTopConversationsLoaded';
        this._setListener(eventName, listener);
    }
    /**
 * [sendGroupMessageToDesignatedUsers] 的接口回调
      消息存入数据库的回调
 */
    setOnGroupMessageToDesignatedUsersAttachedListener(listener) {
        const eventName = 'IRCIMIWListener:onGroupMessageToDesignatedUsersAttached';
        this._setListener(eventName, listener);
    }
    /**
 * [sendGroupMessageToDesignatedUsers] 的接口回调
      消息发送完成的回调
 */
    setOnGroupMessageToDesignatedUsersSentListener(listener) {
        const eventName = 'IRCIMIWListener:onGroupMessageToDesignatedUsersSent';
        this._setListener(eventName, listener);
    }
    /**
     * [syncUltraGroupReadStatus] 的接口监听
     */
    setOnUltraGroupReadStatusSyncedListener(listener) {
        const eventName = 'IRCIMIWListener:onUltraGroupReadStatusSynced';
        this._setListener(eventName, listener);
    }
    /**
     * [loadConversationsForAllChannel] 的接口监听
     */
    setOnConversationsLoadedForAllChannelListener(listener) {
        const eventName = 'IRCIMIWListener:onConversationsLoadedForAllChannel';
        this._setListener(eventName, listener);
    }
    /**
     * [loadUltraGroupUnreadMentionedCount] 的接口监听
     */
    setOnUltraGroupUnreadMentionedCountLoadedListener(listener) {
        const eventName = 'IRCIMIWListener:onUltraGroupUnreadMentionedCountLoaded';
        this._setListener(eventName, listener);
    }
    setOnUltraGroupUnreadCountLoadedListener(listener) {
        const eventName = 'IRCIMIWListener:onUltraGroupUnreadCountLoaded';
        this._setListener(eventName, listener);
    }
    /**
     * [modifyUltraGroupMessage] 的接口监听
     */
    setOnUltraGroupMessageModifiedListener(listener) {
        const eventName = 'IRCIMIWListener:onUltraGroupMessageModified';
        this._setListener(eventName, listener);
    }
    /**
     * [recallUltraGroupMessage] 的接口监听
     */
    setOnUltraGroupMessageRecalledListener(listener) {
        const eventName = 'IRCIMIWListener:onUltraGroupMessageRecalled';
        this._setListener(eventName, listener);
    }
    /**
     * [clearUltraGroupMessages] 的接口监听
     */
    setOnUltraGroupMessagesClearedListener(listener) {
        const eventName = 'IRCIMIWListener:onUltraGroupMessagesCleared';
        this._setListener(eventName, listener);
    }
    /**
     * [clearUltraGroupMessagesForAllChannel] 的接口监听
     */
    setOnUltraGroupMessagesClearedForAllChannelListener(listener) {
        const eventName = 'IRCIMIWListener:onUltraGroupMessagesClearedForAllChannel';
        this._setListener(eventName, listener);
    }
    /**
     * [sendUltraGroupTypingStatus] 的接口监听
     */
    setOnUltraGroupTypingStatusSentListener(listener) {
        const eventName = 'IRCIMIWListener:onUltraGroupTypingStatusSent';
        this._setListener(eventName, listener);
    }
    /**
     * [loadBatchRemoteUltraGroupMessages] 的接口监听
     */
    setOnBatchRemoteUltraGroupMessagesLoadedListener(listener) {
        const eventName = 'IRCIMIWListener:onBatchRemoteUltraGroupMessagesLoaded';
        this._setListener(eventName, listener);
    }
    /**
     * [updateUltraGroupMessageExpansion] 的接口监听
     */
    setOnUltraGroupMessageExpansionUpdatedListener(listener) {
        const eventName = 'IRCIMIWListener:onUltraGroupMessageExpansionUpdated';
        this._setListener(eventName, listener);
    }
    /**
     * [removeUltraGroupMessageExpansion] 的接口监听
     */
    setOnUltraGroupMessageExpansionRemovedListener(listener) {
        const eventName = 'IRCIMIWListener:onUltraGroupMessageExpansionRemoved';
        this._setListener(eventName, listener);
    }
}
