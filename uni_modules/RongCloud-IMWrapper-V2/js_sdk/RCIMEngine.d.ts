import { RCIMIWEngineOptions } from './RCIMDefines';
import { OnAllChatRoomEntriesLoadedResult, OnBatchRemoteUltraGroupMessagesLoadedResult, OnBlacklistAddedResult, OnBlacklistLoadedResult, OnBlacklistRemovedResult, OnBlacklistStatusLoadedResult, OnBlockedConversationsLoadedResult, OnChatRoomEntriesAddedResult, OnChatRoomEntriesChangedResult, OnChatRoomEntriesRemovedResult, OnChatRoomEntriesSyncedResult, OnChatRoomEntryAddedResult, OnChatRoomEntryLoadedResult, OnChatRoomEntryRemovedResult, OnChatRoomJoinedResult, OnChatRoomJoiningResult, OnChatRoomLeftResult, OnChatRoomMemberChangedResult, OnChatRoomMessagesLoadedResult, OnChatRoomStatusChangedResult, OnConnectedResult, OnConnectionStatusChangedResult, OnConversationLoadedResult, OnConversationNotificationLevelChangedResult, OnConversationNotificationLevelLoadedResult, OnConversationReadStatusSyncMessageReceivedResult, OnConversationReadStatusSyncedResult, OnConversationRemovedResult, OnConversationTopStatusChangedResult, OnConversationTopStatusLoadedResult, OnConversationTopStatusSyncedResult, OnConversationTypeNotificationLevelChangedResult, OnConversationTypeNotificationLevelLoadedResult, OnConversationsLoadedForAllChannelResult, OnConversationsLoadedResult, OnConversationsRemovedResult, OnConversationsSearchedResult, OnDatabaseOpenedResult, OnDownloadingMediaMessageCanceledResult, OnDraftMessageClearedResult, OnDraftMessageLoadedResult, OnDraftMessageSavedResult, OnFirstUnreadMessageLoadedResult, OnGroupMessageReadReceiptRequestReceivedResult, OnGroupMessageReadReceiptResponseReceivedResult, OnGroupMessageToDesignatedUsersAttachedResult, OnGroupMessageToDesignatedUsersSentResult, OnGroupReadReceiptRequestSentResult, OnGroupReadReceiptResponseSentResult, OnLocalMessagesDeletedResult, OnMediaMessageAttachedResult, OnMediaMessageDownloadedResult, OnMediaMessageDownloadingResult, OnMediaMessageSendingResult, OnMediaMessageSentResult, OnMessageAttachedResult, OnMessageBlockedResult, OnMessageClearedResult, OnMessageCountLoadedResult, OnMessageExpansionForKeysRemovedResult, OnMessageExpansionUpdatedResult, OnMessageInsertedResult, OnMessageRecalledResult, OnMessageReceiveStatusChangedResult, OnMessageReceivedResult, OnMessageSentResult, OnMessageSentStatusChangedResult, OnMessagesDeletedResult, OnMessagesInsertedResult, OnMessagesLoadedResult, OnMessagesSearchedByTimeRangeResult, OnMessagesSearchedByUserIdResult, OnMessagesSearchedResult, OnNotificationQuietHoursChangedResult, OnNotificationQuietHoursLoadedResult, OnNotificationQuietHoursRemovedResult, OnPrivateReadReceiptMessageSentResult, OnPrivateReadReceiptReceivedResult, OnPushContentShowStatusChangedResult, OnPushLanguageChangedResult, OnPushReceiveStatusChangedResult, OnRemoteMessageExpansionForKeyRemovedResult, OnRemoteMessageExpansionUpdatedResult, OnRemoteMessageRecalledResult, OnRemoteUltraGroupMessageExpansionUpdatedResult, OnRemoteUltraGroupMessageModifiedResult, OnRemoteUltraGroupMessageRecalledResult, OnSendingMediaMessageCanceledResult, OnTopConversationsLoadedResult, OnTotalUnreadCountLoadedResult, OnTypingStatusChangedResult, OnUltraGroupAllUnreadCountLoadedResult, OnUltraGroupAllUnreadMentionedCountLoadedResult, OnUltraGroupChannelDefaultNotificationLevelChangedResult, OnUltraGroupChannelDefaultNotificationLevelLoadedResult, OnUltraGroupDefaultNotificationLevelChangedResult, OnUltraGroupDefaultNotificationLevelLoadedResult, OnUltraGroupMessageExpansionRemovedResult, OnUltraGroupMessageExpansionUpdatedResult, OnUltraGroupMessageModifiedResult, OnUltraGroupMessageRecalledResult, OnUltraGroupMessagesClearedForAllChannelResult, OnUltraGroupMessagesClearedResult, OnUltraGroupReadStatusSyncedResult, OnUltraGroupReadTimeReceivedResult, OnUltraGroupTypingStatusChangedResult, OnUltraGroupTypingStatusSentResult, OnUltraGroupUnreadCountLoadedResult, OnUltraGroupUnreadMentionedCountLoadedResult, OnUnreadCountByConversationTypesLoadedResult, OnUnreadCountClearedResult, OnUnreadCountLoadedResult, OnUnreadMentionedCountLoadedResult, OnUnreadMentionedMessagesLoadedResult, RCIMIWConversationType, RCIMIWCustomMessage, RCIMIWCustomMessagePolicy, RCIMIWFileMessage, RCIMIWGIFMessage, RCIMIWImageMessage, RCIMIWLocationMessage, RCIMIWLogLevel, RCIMIWMediaMessage, RCIMIWMessage, RCIMIWMessageOperationPolicy, RCIMIWMessageType, RCIMIWPushNotificationLevel, RCIMIWPushNotificationQuietHoursLevel, RCIMIWReceivedStatus, RCIMIWReferenceMessage, RCIMIWSentStatus, RCIMIWSightMessage, RCIMIWTextMessage, RCIMIWTimeOrder, RCIMIWUltraGroupTypingStatus, RCIMIWVoiceMessage } from './RCIMDefines';
export default class RCIMIWEngine {
    private _invokeMethod;
    private _setListener;
    /**
     * 初始化 IM 对象
     * @param appKey 融云后台申请的应用 appKey
     * @param options 全局配置项
     * @returns 创建的 IM 对象
     */
    static create(appKey: string, options?: RCIMIWEngineOptions): Promise<RCIMIWEngine | undefined>;
    /**
     * 销毁 IM 对象
     */
    destroy(): Promise<number>;
    /**
     * 根据消息 id 获取消息体（本地数据库索引唯一值）。
     * @param messageId 消息的 messageId，可在消息对象中获取
     */
    getMessageById(messageId: number): Promise<{
        code: number;
        message: RCIMIWMessage;
    }>;
    /**
     * 通过全局唯一 id 获取消息实体。
     * @param messageUId 消息的 messageUid，可在消息对象中获取，且只有发送成功的消息才会有值。
     */
    getMessageByUId(messageUId: string): Promise<{
        code: number;
        message: RCIMIWMessage;
    }>;
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
    connect(token: string, timeout: number): Promise<number>;
    /**
     * 断开链接
     * 注：因为 SDK 在前后台切换或者网络出现异常都会自动重连，保证连接可靠性。 所以除非您的 App 逻辑需要登出，否则一般不需要调用此方法进行手动断开
     * @param receivePush 退出后是否接收 push，true:断开后接收远程推送，false:断开后不再接收远程推送
     * @return 当次接口操作的状态码。0 代表调用成功 具体结果需要实现接口回调，非 0 代表当前接口调用操作失败，不会触发接口回调，详细错误参考错误码
     */
    disconnect(receivePush: boolean): Promise<number>;
    /**
     * 构建文本消息
     * @param type      会话类型，
     * @param targetId  会话 ID
     * @param channelId 频道 ID，仅支持超级群使用，其他会话类型传 null 即可。
     * @param text      文本内容
     * @return 文本消息实体
     */
    createTextMessage(type: RCIMIWConversationType, targetId: string, channelId: string, text: string): Promise<RCIMIWTextMessage>;
    /**
     * 构建图片消息
     * @param type      会话类型
     * @param targetId  会话 ID
     * @param channelId 频道 ID，仅支持超级群使用，其他会话类型传 null 即可。
     * @param path      图片消息的本地路径，必须为有效路径
     * @return 图片消息实体
     */
    createImageMessage(type: RCIMIWConversationType, targetId: string, channelId: string, path: string): Promise<RCIMIWImageMessage>;
    /**
     * 构建文件消息
     * @param type      会话类型
     * @param targetId  会话 ID
     * @param channelId 频道 ID，仅支持超级群使用，其他会话类型传 null 即可。
     * @param path      文件消息的本地路径，必须为有效路径
     * @return 文件消息实体
     */
    createFileMessage(type: RCIMIWConversationType, targetId: string, channelId: string, path: string): Promise<RCIMIWFileMessage>;
    /**
     * 构建小视频消息
     * @param type      会话类型
     * @param targetId  会话 ID
     * @param channelId 频道 ID，仅支持超级群使用，其他会话类型传 null 即可。
     * @param path      小视频消息的本地路径，必须为有效路径
     * @param duration  小视频消息的视频时长
     * @return 视频消息实体
     */
    createSightMessage(type: RCIMIWConversationType, targetId: string, channelId: string, path: string, duration: number): Promise<RCIMIWSightMessage>;
    /**
     * 构建语音消息 (高清语音)
     * @param type      会话类型
     * @param targetId  会话 ID
     * @param channelId 频道 ID，仅支持超级群使用，其他会话类型传 null 即可。
     * @param path      语音消息的本地路径，必须为有效路径
     * @param duration  语音消息的消息时长
     * @return 语音消息的实体
     */
    createVoiceMessage(type: RCIMIWConversationType, targetId: string, channelId: string, path: string, duration: number): Promise<RCIMIWVoiceMessage>;
    /**
     * 构建引用消息
     * @param type             会话类型
     * @param targetId         会话 ID
     * @param channelId        频道 ID，仅支持超级群使用，其他会话类型传 null 即可。
     * @param referenceMessage 引用的消息
     * @param text             引用的文本内容
     * @return 引用消息实体
     */
    createReferenceMessage(type: RCIMIWConversationType, targetId: string, channelId: string, referenceMessage: RCIMIWMessage, text: string): Promise<RCIMIWReferenceMessage>;
    /**
     * 构建 GIF 消息
     * @param type      会话类型
     * @param targetId  会话 ID
     * @param channelId 频道 ID，仅支持超级群使用，其他会话类型传 null 即可。
     * @param path      GIF 消息的本地路径
     * @return GIF 消息实体
     */
    createGIFMessage(type: RCIMIWConversationType, targetId: string, channelId: string, path: string): Promise<RCIMIWGIFMessage>;
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
    createCustomMessage(type: RCIMIWConversationType, targetId: string, channelId: string, policy: RCIMIWCustomMessagePolicy, messageIdentifier: string, fields: {
        [propName: string]: string;
    }): Promise<RCIMIWCustomMessage>;
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
    createLocationMessage(type: RCIMIWConversationType, targetId: string, channelId: string, longitude: number, latitude: number, poiName: string, thumbnailPath: string): Promise<RCIMIWLocationMessage>;
    /**
     * 发送普通消息
     * @param message 发送的消息实体
     * @return 当次接口操作的状态码。0 代表调用成功 具体结果需要实现接口回调，非 0 代表当前接口调用操作失败，不会触发接口回调，详细错误参考错误码
     * @listener 接口回调可以监听 [onMessageAttached],[onMessageSent]
     */
    sendMessage(message: RCIMIWMessage): Promise<number>;
    /**
     * 发送媒体消息
     * @param message 发送的媒体消息实体
     * @return 当次接口操作的状态码。0 代表调用成功 具体结果需要实现接口回调，非 0 代表当前接口调用操作失败，不会触发接口回调，详细错误参考错误码
     * @listener 接口回调可以监听 [onMediaMessageSending],[onMediaMessageAttached],[onMediaMessageAttached],[onMediaMessageSent]
     */
    sendMediaMessage(message: RCIMIWMediaMessage): Promise<number>;
    /**
     * 取消发送媒体消息
     * @param message 需要取消发送的媒体消息实体
     * @return 当次接口操作的状态码。0 代表调用成功 具体结果需要实现接口回调，非 0 代表当前接口调用操作失败，不会触发接口回调，详细错误参考错误码
     * @listener 接口回调可以监听 [onSendingMediaMessageCanceled]
     */
    cancelSendingMediaMessage(message: RCIMIWMediaMessage): Promise<number>;
    /**
     * 下载媒体消息
     * @param message 需要下载的媒体消息实体
     * @return 当次接口操作的状态码。0 代表调用成功 具体结果需要实现接口回调，非 0 代表当前接口调用操作失败，不会触发接口回调，详细错误参考错误码
     * @listener [onMediaMessageDownloaded], [onMediaMessageDownloading]
     */
    downloadMediaMessage(message: RCIMIWMediaMessage): Promise<number>;
    /**
     * 取消下载媒体消息
     * @param message 需要取消下载的媒体消息实体
     * @return 当次接口操作的状态码。0 代表调用成功 具体结果需要实现接口回调，非 0 代表当前接口调用操作失败，不会触发接口回调，详细错误参考错误码
     * @listener [onDownloadingMediaMessageCanceled]
     */
    cancelDownloadingMediaMessage(message: RCIMIWMediaMessage): Promise<number>;
    /**
     * 加载某个会话
     * @param type      会话类型
     * @param targetId  会话 ID
     * @param channelId 频道 ID，仅支持超级群使用，其他会话类型传 null 即可。
     * @return 当次接口操作的状态码。0 代表调用成功 具体结果需要实现接口回调，非 0 代表当前接口调用操作失败，不会触发接口回调，详细错误参考错误码
     * @listener [onConversationLoaded]
     */
    loadConversation(type: RCIMIWConversationType, targetId: string, channelId: string): Promise<number>;
    /**
     * 加载某些会话
     * @param conversationTypes 会话类型
     * @param channelId         频道 ID，仅支持超级群使用，其他会话类型传 null 即可。
     * @param startTime         时间戳（毫秒），获取小于此时间戳的会话，传 0 为查询最新数据
     * @param count             查询的数量， 0 < count <= 50
     * @return 当次接口操作的状态码。0 代表调用成功 具体结果需要实现接口回调，非 0 代表当前接口调用操作失败，不会触发接口回调，详细错误参考错误码
     * @listener [onConversationsLoaded]
     */
    loadConversations(conversationTypes: Array<RCIMIWConversationType>, channelId: string, startTime: number, count: number): Promise<number>;
    /**
     * 移除某个会话
     * @param type      会话类型
     * @param targetId  会话 ID
     * @param channelId 频道 ID，仅支持超级群使用，其他会话类型传 null 即可。
     * @return 当次接口操作的状态码。0 代表调用成功 具体结果需要实现接口回调，非 0 代表当前接口调用操作失败，不会触发接口回调，详细错误参考错误码
     * @listener [onConversationRemoved]
     */
    removeConversation(type: RCIMIWConversationType, targetId: string, channelId: string): Promise<number>;
    /**
     * 根据会话类型移除会话
     * @param conversationTypes 会话类型集合
     * @param channelId         频道 ID，仅支持超级群使用，其他会话类型传 null 即可。
     * @return 当次接口操作的状态码。0 代表调用成功 具体结果需要实现接口回调，非 0 代表当前接口调用操作失败，不会触发接口回调，详细错误参考错误码
     * @listener [onConversationsRemoved]
     */
    removeConversations(conversationTypes: Array<RCIMIWConversationType>, channelId: string): Promise<number>;
    /**
     * 加载某个会话的未读数
     * 注：不支持聊天室！
     * @param type      会话类型
     * @param targetId  会话 ID
     * @param channelId 频道 ID，仅支持超级群使用，其他会话类型传 null 即可。
     * @return 当次接口操作的状态码。0 代表调用成功 具体结果需要实现接口回调，非 0 代表当前接口调用操作失败，不会触发接口回调，详细错误参考错误码
     * @listener [onUnreadCountLoaded]
     */
    loadUnreadCount(type: RCIMIWConversationType, targetId: string, channelId: string): Promise<number>;
    /**
     * 加载所有未读数
     * @param channelId 频道 ID，仅支持超级群使用，其他会话类型传 null 即可。
     * @return 当次接口操作的状态码。0 代表调用成功 具体结果需要实现接口回调，非 0 代表当前接口调用操作失败，不会触发接口回调，详细错误参考错误码
     * @listener [onTotalUnreadCountLoaded]
     */
    loadTotalUnreadCount(channelId: string): Promise<number>;
    /**
     * 获取会话中未读的 @ 消息。
     * 注：不支持聊天室！
     * @param type      会话类型
     * @param targetId  会话 ID
     * @param channelId 频道 ID，仅支持超级群使用，其他会话类型传 null 即可。
     * @return 当次接口操作的状态码。0 代表调用成功 具体结果需要实现接口回调，非 0 代表当前接口调用操作失败，不会触发接口回调，详细错误参考错误码
     * @listener [onUnreadMentionedCountLoaded]
     */
    loadUnreadMentionedCount(type: RCIMIWConversationType, targetId: string, channelId: string): Promise<number>;
    /**
     * 获取当前用户加入的所有超级群会话的未读消息数的总和。
     * @return 当次接口操作的状态码。0 代表调用成功 具体结果需要实现接口回调，非 0 代表当前接口调用操作失败，不会触发接口回调，详细错误参考错误码
     * @listener [onUltraGroupAllUnreadCountLoaded]
     */
    loadUltraGroupAllUnreadCount(): Promise<number>;
    /**
     * 获取当前用户加入的所有超级群会话中的未读 @ 消息数的总和。
     * @return 当次接口操作的状态码。0 代表调用成功 具体结果需要实现接口回调，非 0 代表当前接口调用操作失败，不会触发接口回调，详细错误参考错误码
     * @listener [onUltraGroupAllUnreadMentionedCountLoaded]
     */
    loadUltraGroupAllUnreadMentionedCount(): Promise<number>;
    /**
     * 获取指定会话的未读消息数
     * @param targetId 会话 ID
     * @return 当次接口操作的状态码。0 代表调用成功 具体结果需要实现接口回调，非 0 代表当前接口调用操作失败，不会触发接口回调，详细错误参考错误码
     * @listener [onUltraGroupUnreadCountLoaded]
     */
    loadUltraGroupUnreadCount(targetId: string): Promise<number>;
    /**
     * 获取超级群会话中被 @ 的消息数
     * @param targetId 会话 ID
     * @return 当次接口操作的状态码。0 代表调用成功 具体结果需要实现接口回调，非 0 代表当前接口调用操作失败，不会触发接口回调，详细错误参考错误码
     * @listener [onUltraGroupUnreadMentionedCountLoaded]
     */
    loadUltraGroupUnreadMentionedCount(targetId: string): Promise<number>;
    /**
     * 根据会话类型加载未读数
     * 注：不支持聊天室！
     * @param conversationTypes 会话类型集合
     * @param channelId         频道 ID，仅支持超级群使用，其他会话类型传 null 即可。
     * @param contain           是否包含免打扰消息的未读消息数。
     * @return 当次接口操作的状态码。0 代表调用成功 具体结果需要实现接口回调，非 0 代表当前接口调用操作失败，不会触发接口回调，详细错误参考错误码
     * @listener [onUnreadCountByConversationTypesLoaded]
     */
    loadUnreadCountByConversationTypes(conversationTypes: Array<RCIMIWConversationType>, channelId: string, contain: boolean): Promise<number>;
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
    clearUnreadCount(type: RCIMIWConversationType, targetId: string, channelId: string, timestamp: number): Promise<number>;
    /**
     * 保存会话草稿信息。
     * @param type      会话类型
     * @param targetId  会话 ID
     * @param channelId 频道 ID，仅支持超级群使用，其他会话类型传 null 即可。
     * @param draft     草稿的文字内容。
     * @return 当次接口操作的状态码。0 代表调用成功 具体结果需要实现接口回调，非 0 代表当前接口调用操作失败，不会触发接口回调，详细错误参考错误码
     * @listener [onDraftMessageSaved]
     */
    saveDraftMessage(type: RCIMIWConversationType, targetId: string, channelId: string, draft: string): Promise<number>;
    /**
     * 获取会话中的草稿信息。
     * @param type      会话类型
     * @param targetId  会话 ID
     * @param channelId 频道 ID，仅支持超级群使用，其他会话类型传 null 即可。
     * @return 当次接口操作的状态码。0 代表调用成功 具体结果需要实现接口回调，非 0 代表当前接口调用操作失败，不会触发接口回调，详细错误参考错误码
     * @listener [onDraftMessageLoaded]
     */
    loadDraftMessage(type: RCIMIWConversationType, targetId: string, channelId: string): Promise<number>;
    /**
     * 删除指定会话中的草稿信息。
     * @param type      会话类型
     * @param targetId  会话 ID
     * @param channelId 频道 ID，仅支持超级群使用，其他会话类型传 null 即可。
     * @return 当次接口操作的状态码。0 代表调用成功 具体结果需要实现接口回调，非 0 代表当前接口调用操作失败，不会触发接口回调，详细错误参考错误码
     * @listener [onDraftMessageCleared]
     */
    clearDraftMessage(type: RCIMIWConversationType, targetId: string, channelId: string): Promise<number>;
    /**
     * 获取免打扰的会话列表。
     * @param conversationTypes 会话类型集合
     * @param channelId         频道 ID，仅支持超级群使用，其他会话类型传 null 即可。
     * @return 当次接口操作的状态码。0 代表调用成功 具体结果需要实现接口回调，非 0 代表当前接口调用操作失败，不会触发接口回调，详细错误参考错误码
     * @listener [onBlockedConversationsLoaded]
     */
    loadBlockedConversations(conversationTypes: Array<RCIMIWConversationType>, channelId: string): Promise<number>;
    /**
     * 设置会话的置顶状态。若会话不存在，调用此方法 SDK 自动创建会话并置顶。
     * @param type      会话类型
     * @param targetId  会话 ID
     * @param channelId 频道 ID，仅支持超级群使用，其他会话类型传 null 即可。
     * @param top       是否置顶
     * @return 当次接口操作的状态码。0 代表调用成功 具体结果需要实现接口回调，非 0 代表当前接口调用操作失败，不会触发接口回调，详细错误参考错误码
     * @listener [onConversationTopStatusChanged]
     */
    changeConversationTopStatus(type: RCIMIWConversationType, targetId: string, channelId: string, top: boolean): Promise<number>;
    /**
     * 获取会话的置顶状态
     * @param type      会话类型
     * @param targetId  会话 ID
     * @param channelId 频道 ID，仅支持超级群使用，其他会话类型传 null 即可。
     * @return 当次接口操作的状态码。0 代表调用成功 具体结果需要实现接口回调，非 0 代表当前接口调用操作失败，不会触发接口回调，详细错误参考错误码
     * @listener [onConversationTopStatusLoaded]
     */
    loadConversationTopStatus(type: RCIMIWConversationType, targetId: string, channelId: string): Promise<number>;
    /**
     * 同步会话阅读状态。
     * @param type      会话类型
     * @param targetId  会话 ID
     * @param channelId 频道 ID，仅支持超级群使用，其他会话类型传 null 即可。
     * @param timestamp 会话中已读的最后一条消息的发送时间戳
     * @return 当次接口操作的状态码。0 代表调用成功 具体结果需要实现接口回调，非 0 代表当前接口调用操作失败，不会触发接口回调，详细错误参考错误码
     * @listener [onConversationReadStatusSynced]
     */
    syncConversationReadStatus(type: RCIMIWConversationType, targetId: string, channelId: string, timestamp: number): Promise<number>;
    /**
     * 向会话中发送正在输入的状态，目前只支持单聊。
     * @param type        会话类型
     * @param targetId    会话 ID
     * @param channelId   频道 ID，仅支持超级群使用，其他会话类型传 null 即可。
     * @param currentType 当前的状态
     * @return 当次接口操作的状态码。0 代表调用成功 具体结果需要实现接口回调，非 0 代表当前接口调用操作失败，不会触发接口回调，详细错误参考错误码
     */
    sendTypingStatus(type: RCIMIWConversationType, targetId: string, channelId: string, currentType: string): Promise<number>;
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
    loadMessages(type: RCIMIWConversationType, targetId: string, channelId: string, sentTime: number, order: RCIMIWTimeOrder, policy: RCIMIWMessageOperationPolicy, count: number): Promise<number>;
    /**
     * 获取第一条未读消息。
     * @param type      会话类型
     * @param targetId  会话 ID
     * @param channelId 频道 ID，仅支持超级群使用，其他会话类型传 null 即可。
     * @return 当次接口操作的状态码。0 代表调用成功 具体结果需要实现接口回调，非 0 代表当前接口调用操作失败，不会触发接口回调，详细错误参考错误码
     * @listener [onFirstUnreadMessageLoaded]
     */
    loadFirstUnreadMessage(type: RCIMIWConversationType, targetId: string, channelId: string): Promise<number>;
    /**
     * 获取会话中未读的 @ 消息。
     * @param type      会话类型
     * @param targetId  会话 ID
     * @param channelId 频道 ID，仅支持超级群使用，其他会话类型传 null 即可。
     * @return 当次接口操作的状态码。0 代表调用成功 具体结果需要实现接口回调，非 0 代表当前接口调用操作失败，不会触发接口回调，详细错误参考错误码
     * @listener [onUnreadMentionedMessagesLoaded]
     */
    loadUnreadMentionedMessages(type: RCIMIWConversationType, targetId: string, channelId: string): Promise<number>;
    /**
     * 插入一条消息
     * @param message 插入的消息
     * @return 当次接口操作的状态码。0 代表调用成功 具体结果需要实现接口回调，非 0 代表当前接口调用操作失败，不会触发接口回调，详细错误参考错误码
     * @listener [onMessageInserted]
     */
    insertMessage(message: RCIMIWMessage): Promise<number>;
    /**
     * 插入多条消息，不支持超级群
     * @param messages 插入的消息集合
     * @return 当次接口操作的状态码。0 代表调用成功 具体结果需要实现接口回调，非 0 代表当前接口调用操作失败，不会触发接口回调，详细错误参考错误码
     * @listener [onMessagesInserted]
     */
    insertMessages(messages: Array<RCIMIWMessage>): Promise<number>;
    /**
     * @param type      会话类型
     * @param targetId  会话 ID
     * @param channelId 频道 ID，仅支持超级群使用，其他会话类型传 null 即可。
     * @param timestamp 清除消息截止时间戳，0 <= recordTime <= 当前会话最后一条消息的 sentTime, 0 清除所有消息，其他值清除小于等于 recordTime 的消息
     * @param policy    清除的策略
     * @return 当次接口操作的状态码。0 代表调用成功 具体结果需要实现接口回调，非 0 代表当前接口调用操作失败，不会触发接口回调，详细错误参考错误码
     * @listener [onMessageCleared]
     */
    clearMessages(type: RCIMIWConversationType, targetId: string, channelId: string, timestamp: number, policy: RCIMIWMessageOperationPolicy): Promise<number>;
    /**
     * @param messages 消息集合
     * @return 当次接口操作的状态码。0 代表调用成功 具体结果需要实现接口回调，非 0 代表当前接口调用操作失败，不会触发接口回调，详细错误参考错误码
     * @listener [onLocalMessagesDeleted]
     */
    deleteLocalMessages(messages: Array<RCIMIWMessage>): Promise<number>;
    /**
     * @param type      会话类型
     * @param targetId  会话 ID
     * @param channelId 频道 ID，仅支持超级群使用，其他会话类型传 null 即可。
     * @param messages  消息集合
     * @return 当次接口操作的状态码。0 代表调用成功 具体结果需要实现接口回调，非 0 代表当前接口调用操作失败，不会触发接口回调，详细错误参考错误码
     * @listener [onMessagesDeleted]
     */
    deleteMessages(type: RCIMIWConversationType, targetId: string, channelId: string, messages: Array<RCIMIWMessage>): Promise<number>;
    /**
     * @param message 需要被撤回的消息
     * @return 当次接口操作的状态码。0 代表调用成功 具体结果需要实现接口回调，非 0 代表当前接口调用操作失败，不会触发接口回调，详细错误参考错误码
     * @listener [onMessageRecalled]
     */
    recallMessage(message: RCIMIWMessage): Promise<number>;
    /**
     * 发送某个会话中的消息阅读回执
     * @param targetId  会话 ID
     * @param channelId 频道 ID，仅支持超级群使用，其他会话类型传 null 即可。
     * @param timestamp 该会话中已读的最后一条消息的发送时间戳
     * @return 当次接口操作的状态码。0 代表调用成功 具体结果需要实现接口回调，非 0 代表当前接口调用操作失败，不会触发接口回调，详细错误参考错误码
     * @listener [onPrivateReadReceiptMessageSent]
     */
    sendPrivateReadReceiptMessage(targetId: string, channelId: string, timestamp: number): Promise<number>;
    /**
     * 发起消息已读回执请求
     * @param message 需要请求已读回执的消息
     * @return 当次接口操作的状态码。0 代表调用成功 具体结果需要实现接口回调，非 0 代表当前接口调用操作失败，不会触发接口回调，详细错误参考错误码
     * @listener [onGroupReadReceiptRequestSent]
     */
    sendGroupReadReceiptRequest(message: RCIMIWMessage): Promise<number>;
    /**
     * 发送已读回执
     * @param targetId  会话 ID
     * @param channelId 频道 ID，仅支持超级群使用，其他会话类型传 null 即可。
     * @param messages  会话中需要发送已读回执的消息列表
     * @return 当次接口操作的状态码。0 代表调用成功 具体结果需要实现接口回调，非 0 代表当前接口调用操作失败，不会触发接口回调，详细错误参考错误码
     * @listener [onGroupReadReceiptResponseSent]
     */
    sendGroupReadReceiptResponse(targetId: string, channelId: string, messages: Array<RCIMIWMessage>): Promise<number>;
    /**
     * 更新消息扩展信息
     * 每条消息携带扩展信息键值对最大值 300个，单次设置扩展信息键值对最大值 20个
     * @param messageUId 消息的 messageUid，可在消息对象中获取，且只有发送成功的消息才会有值
     * @param expansion  要更新的消息扩展信息键值对，类型是 HashMap；Key 支持大小写英文字母、数字、部分特殊符号 + = - _ 的组合方式，不支持汉字。Value 可以输入空格
     * @return 当次接口操作的状态码。0 代表调用成功 具体结果需要实现接口回调，非 0 代表当前接口调用操作失败，不会触发接口回调，详细错误参考错误码
     * @listener [onMessageExpansionUpdated]
     */
    updateMessageExpansion(messageUId: string, expansion: {
        [propName: string]: string;
    }): Promise<number>;
    /**
     * 删除消息扩展信息中特定的键值对
     * @param messageUId 消息的 messageUid，可在消息对象中获取，且只有发送成功的消息才会有值
     * @param keys       消息扩展信息中待删除的 key 的列表，类型是 ArrayList
     * @return 当次接口操作的状态码。0 代表调用成功 具体结果需要实现接口回调，非 0 代表当前接口调用操作失败，不会触发接口回调，详细错误参考错误码
     * @listener [onMessageExpansionForKeysRemoved]
     */
    removeMessageExpansionForKeys(messageUId: string, keys: Array<string>): Promise<number>;
    /**
     * 设置消息发送状态。
     * @param messageId  消息的 messageId，可在消息对象中获取
     * @param sentStatus 要修改的状态
     * @return 当次接口操作的状态码。0 代表调用成功 具体结果需要实现接口回调，非 0 代表当前接口调用操作失败，不会触发接口回调，详细错误参考错误码
     * @listener [onMessageSentStatusChanged]
     */
    changeMessageSentStatus(messageId: number, sentStatus: RCIMIWSentStatus): Promise<number>;
    /**
     * @param messageId      消息的 messageId，可在消息对象中获取
     * @param receivedStatus 要修改的状态
     * @return 当次接口操作的状态码。0 代表调用成功 具体结果需要实现接口回调，非 0 代表当前接口调用操作失败，不会触发接口回调，详细错误参考错误码
     * @listener [onMessageReceiveStatusChanged]
     */
    changeMessageReceiveStatus(messageId: number, receivedStatus: RCIMIWReceivedStatus): Promise<number>;
    /**
     * 加入聊天室。
     * @param targetId     会话 ID
     * @param messageCount 进入聊天室拉取消息数目，-1 时不拉取任何消息，0 时拉取 10 条消息，最多只能拉取 50
     * @param autoCreate   是否创建聊天室，TRUE 如果聊天室不存在，sdk 会创建聊天室并加入，如果已存在，则直接加入
     * @return 当次接口操作的状态码。0 代表调用成功 具体结果需要实现接口回调，非 0 代表当前接口调用操作失败，不会触发接口回调，详细错误参考错误码
     * @listener [onChatRoomJoined]
     */
    joinChatRoom(targetId: string, messageCount: number, autoCreate: boolean): Promise<number>;
    /**
     * 退出聊天室。
     * @param targetId 会话 ID
     * @return 当次接口操作的状态码。0 代表调用成功 具体结果需要实现接口回调，非 0 代表当前接口调用操作失败，不会触发接口回调，详细错误参考错误码
     * @listener [onChatRoomLeft]
     */
    leaveChatRoom(targetId: string): Promise<number>;
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
    loadChatRoomMessages(targetId: string, timestamp: number, order: RCIMIWTimeOrder, count: number): Promise<number>;
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
    addChatRoomEntry(targetId: string, key: string, value: string, deleteWhenLeft: boolean, overwrite: boolean): Promise<number>;
    /**
     * 批量设置聊天室自定义属性
     * @param targetId       会话 ID
     * @param entries        聊天室属性
     * @param deleteWhenLeft 用户掉线或退出时，是否自动删除该 Key、Value 值
     * @param overwrite      是否强制覆盖
     * @return 当次接口操作的状态码。0 代表调用成功 具体结果需要实现接口回调，非 0 代表当前接口调用操作失败，不会触发接口回调，详细错误参考错误码
     * @listener [onChatRoomEntriesAdded]
     */
    addChatRoomEntries(targetId: string, entries: {
        [propName: string]: string;
    }, deleteWhenLeft: boolean, overwrite: boolean): Promise<number>;
    /**
     * 获取聊天室单个属性。
     * @param targetId 会话 ID
     * @param key      聊天室属性键值
     * @return 当次接口操作的状态码。0 代表调用成功 具体结果需要实现接口回调，非 0 代表当前接口调用操作失败，不会触发接口回调，详细错误参考错误码
     * @listener [onChatRoomEntryLoaded]
     */
    loadChatRoomEntry(targetId: string, key: string): Promise<number>;
    /**
     * 获取聊天室所有属性。
     * @param targetId 会话 ID
     * @return 当次接口操作的状态码。0 代表调用成功 具体结果需要实现接口回调，非 0 代表当前接口调用操作失败，不会触发接口回调，详细错误参考错误码
     * @listener [onAllChatRoomEntriesLoaded]
     */
    loadAllChatRoomEntries(targetId: string): Promise<number>;
    /**
     * 删除聊天室自定义属性。
     * @param targetId 会话 ID
     * @param key      聊天室属性键值
     * @param force    是否强制删除
     * @return 当次接口操作的状态码。0 代表调用成功 具体结果需要实现接口回调，非 0 代表当前接口调用操作失败，不会触发接口回调，详细错误参考错误码
     * @listener [onChatRoomEntryRemoved]
     */
    removeChatRoomEntry(targetId: string, key: string, force: boolean): Promise<number>;
    /**
     * 批量删除聊天室自定义属性
     * @param targetId 会话 ID
     * @param keys     聊天室属性
     * @param force    是否强制覆盖
     * @return 当次接口操作的状态码。0 代表调用成功 具体结果需要实现接口回调，非 0 代表当前接口调用操作失败，不会触发接口回调，详细错误参考错误码
     * @listener [onChatRoomEntriesRemoved]
     */
    removeChatRoomEntries(targetId: string, keys: Array<string>, force: boolean): Promise<number>;
    /**
     * 将某个用户加入黑名单。
     * 当你把对方加入黑名单后，对方再发消息时，就会提示“已被加入黑名单，消息发送失败”。 但你依然可以发消息个对方。
     * @param userId 用户 Id
     * @return 当次接口操作的状态码。0 代表调用成功 具体结果需要实现接口回调，非 0 代表当前接口调用操作失败，不会触发接口回调，详细错误参考错误码
     * @listener [onBlacklistAdded]
     */
    addToBlacklist(userId: string): Promise<number>;
    /**
     * 将某个用户从黑名单中移出。
     * @param userId 用户 Id
     * @return 当次接口操作的状态码。0 代表调用成功 具体结果需要实现接口回调，非 0 代表当前接口调用操作失败，不会触发接口回调，详细错误参考错误码
     * @listener [onBlacklistRemoved]
     */
    removeFromBlacklist(userId: string): Promise<number>;
    /**
     * 获取某用户是否在黑名单中。
     * @param userId 用户 Id
     * @return 当次接口操作的状态码。0 代表调用成功 具体结果需要实现接口回调，非 0 代表当前接口调用操作失败，不会触发接口回调，详细错误参考错误码
     * @listener [onBlacklistStatusLoaded]
     */
    loadBlacklistStatus(userId: string): Promise<number>;
    /**
     * 获取当前用户设置的黑名单列表。
     * @return 当次接口操作的状态码。0 代表调用成功 具体结果需要实现接口回调，非 0 代表当前接口调用操作失败，不会触发接口回调，详细错误参考错误码
     * @listener [onBlacklistLoaded]
     */
    loadBlacklist(): Promise<number>;
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
    searchMessages(type: RCIMIWConversationType, targetId: string, channelId: string, keyword: string, startTime: number, count: number): Promise<number>;
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
    searchMessagesByTimeRange(type: RCIMIWConversationType, targetId: string, channelId: string, keyword: string, startTime: number, endTime: number, offset: number, count: number): Promise<number>;
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
    searchMessagesByUserId(userId: string, type: RCIMIWConversationType, targetId: string, channelId: string, startTime: number, count: number): Promise<number>;
    /**
     * 根据关键字搜索会话。
     * @param conversationTypes 会话类型集合
     * @param channelId         频道 ID，仅支持超级群使用，其他会话类型传 null 即可。
     * @param messageTypes      搜索的消息类型
     * @param keyword           搜索的关键字。
     * @return 当次接口操作的状态码。0 代表调用成功 具体结果需要实现接口回调，非 0 代表当前接口调用操作失败，不会触发接口回调，详细错误参考错误码
     * @listener [onConversationsSearched]
     */
    searchConversations(conversationTypes: Array<RCIMIWConversationType>, channelId: string, messageTypes: Array<RCIMIWMessageType>, keyword: string): Promise<number>;
    /**
     * 屏蔽某个时间段的消息提醒
     * @param startTime 开始消息免打扰时间，格式为 HH:MM:SS
     * @param spanMins  需要消息免打扰分钟数，0 < spanMins < 1440（ 比如，您设置的起始时间是 00：00， 结束时间为 01:00，则 spanMins 为 60 分钟。设置为 1439 代表全天免打扰 （23  60 + 59 = 1439 ））
     * @param level     消息通知级别
     * @return 当次接口操作的状态码。0 代表调用成功 具体结果需要实现接口回调，非 0 代表当前接口调用操作失败，不会触发接口回调，详细错误参考错误码
     * @listener [onNotificationQuietHoursChanged]
     */
    changeNotificationQuietHours(startTime: string, spanMins: number, level: RCIMIWPushNotificationQuietHoursLevel): Promise<number>;
    /**
     * 删除已设置的全局时间段消息提醒屏蔽
     * @return 当次接口操作的状态码。0 代表调用成功 具体结果需要实现接口回调，非 0 代表当前接口调用操作失败，不会触发接口回调，详细错误参考错误码
     */
    removeNotificationQuietHours(): Promise<number>;
    /**
     * 查询已设置的时间段消息提醒屏蔽
     * @return 当次接口操作的状态码。0 代表调用成功 具体结果需要实现接口回调，非 0 代表当前接口调用操作失败，不会触发接口回调，详细错误参考错误码
     */
    loadNotificationQuietHours(): Promise<number>;
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
    changeConversationNotificationLevel(type: RCIMIWConversationType, targetId: string, channelId: string, level: RCIMIWPushNotificationLevel): Promise<number>;
    /**
     * 获取会话的消息提醒状态
     * @param type      会话类型
     * @param targetId  会话 ID
     * @param channelId 频道 ID，仅支持超级群使用，其他会话类型传 null 即可。
     * @return 当次接口操作的状态码。0 代表调用成功 具体结果需要实现接口回调，非 0 代表当前接口调用操作失败，不会触发接口回调，详细错误参考错误码
     * @listener [onConversationNotificationLevelLoaded]
     */
    loadConversationNotificationLevel(type: RCIMIWConversationType, targetId: string, channelId: string): Promise<number>;
    /**
     * 设置会话类型的消息提醒状态
     * 注：如要移除消息提醒状态，设置level为RCIMIWPushNotificationLevelDefault
     * @param type  会话类型
     * @param level 消息通知级别
     * @return 当次接口操作的状态码。0 代表调用成功 具体结果需要实现接口回调，非 0 代表当前接口调用操作失败，不会触发接口回调，详细错误参考错误码
     * @listener [onConversationTypeNotificationLevelChanged]
     */
    changeConversationTypeNotificationLevel(type: RCIMIWConversationType, level: RCIMIWPushNotificationLevel): Promise<number>;
    /**
     * 获取会话类型的消息提醒状态
     * @param type 会话类型
     * @return [onConversationTypeNotificationLevelLoaded]
     */
    loadConversationTypeNotificationLevel(type: RCIMIWConversationType): Promise<number>;
    /**
     * 设置超级群的默认消息状态
     * 一般由管理员设置的接口，针对超级群的所有群成员生效，针对超级群下所有频道生效，优先级较低。如果群成员自己超级群的免打扰级别，那么以群成员自己设置的为准。
     * @param targetId 会话 ID
     * @param level    消息通知级别
     * @return 当次接口操作的状态码。0 代表调用成功 具体结果需要实现接口回调，非 0 代表当前接口调用操作失败，不会触发接口回调，详细错误参考错误码
     * @listener [onUltraGroupDefaultNotificationLevelChanged]
     */
    changeUltraGroupDefaultNotificationLevel(targetId: string, level: RCIMIWPushNotificationLevel): Promise<number>;
    /**
     * 获取超级群的默认消息状态
     * @param targetId 会话 ID
     * @return 当次接口操作的状态码。0 代表调用成功 具体结果需要实现接口回调，非 0 代表当前接口调用操作失败，不会触发接口回调，详细错误参考错误码
     * @listener [onUltraGroupDefaultNotificationLevelLoaded]
     */
    loadUltraGroupDefaultNotificationLevel(targetId: string): Promise<number>;
    /**
     * 设置超级群频道的默认消息状态
     * @param targetId  会话 ID
     * @param channelId 频道 ID，仅支持超级群使用，其他会话类型传 null 即可。
     * @param level     消息通知级别
     * @return 当次接口操作的状态码。0 代表调用成功 具体结果需要实现接口回调，非 0 代表当前接口调用操作失败，不会触发接口回调，详细错误参考错误码
     * @listener [onUltraGroupChannelDefaultNotificationLevelChanged]
     */
    changeUltraGroupChannelDefaultNotificationLevel(targetId: string, channelId: string, level: RCIMIWPushNotificationLevel): Promise<number>;
    /**
     * 获取超级群频道的默认消息状态
     * @param targetId  会话 ID
     * @param channelId 频道 ID，仅支持超级群使用。
     * @return 当次接口操作的状态码。0 代表调用成功 具体结果需要实现接口回调，非 0 代表当前接口调用操作失败，不会触发接口回调，详细错误参考错误码
     * @listener [onUltraGroupChannelDefaultNotificationLevelLoaded]
     */
    loadUltraGroupChannelDefaultNotificationLevel(targetId: string, channelId: string): Promise<number>;
    /**
     * 设置是否显示远程推送内容详情，此功能需要从服务端开启用户设置功能。
     * @param showContent 是否显示远程推送内容
     * @return 当次接口操作的状态码。0 代表调用成功 具体结果需要实现接口回调，非 0 代表当前接口调用操作失败，不会触发接口回调，详细错误参考错误码
     * @listener [onPushContentShowStatusChanged]
     */
    changePushContentShowStatus(showContent: boolean): Promise<number>;
    /**
     * 设置推送语言
     * @param language 推送语言， 目前仅支持 en_us、zh_cn、ar_sa
     * @return 当次接口操作的状态码。0 代表调用成功 具体结果需要实现接口回调，非 0 代表当前接口调用操作失败，不会触发接口回调，详细错误参考错误码
     * @listener [onPushLanguageChanged]
     */
    changePushLanguage(language: string): Promise<number>;
    /**
     * 设置是否接收远程推送。
     * 前提：移动端未在线，Web 、MAC/PC 终端在线，移动端是否接收远程推送。
     * 此功能需要从服务端开启用户设置功能。
     * @param receive 是否接收
     * @return 当次接口操作的状态码。0 代表调用成功 具体结果需要实现接口回调，非 0 代表当前接口调用操作失败，不会触发接口回调，详细错误参考错误码
     * @listener [onPushReceiveStatusChanged]
     */
    changePushReceiveStatus(receive: boolean): Promise<number>;
    /**
     * 给指定的群成员发送消息
     * @param message 要发送的消息
     * @param userIds 群成员集合
     * @return 当次接口操作的状态码。0 代表调用成功 具体结果需要实现接口回调，非 0 代表当前接口调用操作失败，不会触发接口回调，详细错误参考错误码
     * @listener [onGroupMessageToDesignatedUsersAttached], [onGroupMessageToDesignatedUsersSent]
     */
    sendGroupMessageToDesignatedUsers(message: RCIMIWMessage, userIds: Array<string>): Promise<number>;
    /**
     * 获取指定会话的消息总数。
     * @param type      会话类型
     * @param targetId  会话 ID
     * @param channelId 频道 ID，仅支持超级群使用，其他会话类型传 null 即可。
     * @return 当次接口操作的状态码。0 代表调用成功 具体结果需要实现接口回调，非 0 代表当前接口调用操作失败，不会触发接口回调，详细错误参考错误码
     * @listener [onMessageCountLoaded]
     */
    loadMessageCount(type: RCIMIWConversationType, targetId: string, channelId: string): Promise<number>;
    /**
     * 根据会话类型,获取置顶会话列表
     * @param conversationTypes 会话类型集合
     * @param channelId         频道 ID，仅支持超级群使用，其他会话类型传 null 即可。
     * @return 当次接口操作的状态码。0 代表调用成功 具体结果需要实现接口回调，非 0 代表当前接口调用操作失败，不会触发接口回调，详细错误参考错误码
     * @listener [onTopConversationsLoaded]
     */
    loadTopConversations(conversationTypes: Array<RCIMIWConversationType>, channelId: string): Promise<number>;
    /**
     * 上报超级群的已读时间
     * @param targetId  会话 ID
     * @param channelId 频道 ID，仅支持超级群使用，其他会话类型传 null 即可。
     * @param timestamp 已读时间
     * @return 当次接口操作的状态码。0 代表调用成功 具体结果需要实现接口回调，非 0 代表当前接口调用操作失败，不会触发接口回调，详细错误参考错误码
     * @listener [onUltraGroupReadStatusSynced]
     */
    syncUltraGroupReadStatus(targetId: string, channelId: string, timestamp: number): Promise<number>;
    /**
     * 获取特定会话下所有频道的会话列表，只支持超级群
     * @param type     会话类型
     * @param targetId 会话 ID
     * @return 当次接口操作的状态码。0 代表调用成功 具体结果需要实现接口回调，非 0 代表当前接口调用操作失败，不会触发接口回调，详细错误参考错误码
     * @listener [onConversationsLoadedForAllChannel]
     */
    loadConversationsForAllChannel(type: RCIMIWConversationType, targetId: string): Promise<number>;
    /**
     * 修改消息
     * @param messageUId 消息的 messageUid，可在消息对象中获取，且只有发送成功的消息才会有值
     * @param message    要修改的 message
     * @return 当次接口操作的状态码。0 代表调用成功 具体结果需要实现接口回调，非 0 代表当前接口调用操作失败，不会触发接口回调，详细错误参考错误码
     * @listener [onUltraGroupMessageModified]
     */
    modifyUltraGroupMessage(messageUId: string, message: RCIMIWMessage): Promise<number>;
    /**
     * 撤回超级群消息
     * @param message      需要撤回的消息
     * @param deleteRemote 是否删除远端消息
     * @return 当次接口操作的状态码。0 代表调用成功 具体结果需要实现接口回调，非 0 代表当前接口调用操作失败，不会触发接口回调，详细错误参考错误码
     * @listener [onUltraGroupMessageRecalled]
     */
    recallUltraGroupMessage(message: RCIMIWMessage, deleteRemote: boolean): Promise<number>;
    /**
     * 删除本地特定 channel 特点时间之前的消息
     * @param targetId  会话 ID
     * @param channelId 频道 ID，仅支持超级群使用，其他会话类型传 null 即可。
     * @param timestamp 时间戳
     * @param policy    清除策略
     * @return 当次接口操作的状态码。0 代表调用成功 具体结果需要实现接口回调，非 0 代表当前接口调用操作失败，不会触发接口回调，详细错误参考错误码
     * @listener [onUltraGroupMessagesCleared]
     */
    clearUltraGroupMessages(targetId: string, channelId: string, timestamp: number, policy: RCIMIWMessageOperationPolicy): Promise<number>;
    /**
     * 发送超级群输入状态
     * @param targetId     会话 ID
     * @param channelId    频道 ID，仅支持超级群使用，其他会话类型传 null 即可。
     * @param typingStatus
     * @return 当次接口操作的状态码。0 代表调用成功 具体结果需要实现接口回调，非 0 代表当前接口调用操作失败，不会触发接口回调，详细错误参考错误码
     * @listener [onUltraGroupTypingStatusSent]
     */
    sendUltraGroupTypingStatus(targetId: string, channelId: string, typingStatus: RCIMIWUltraGroupTypingStatus): Promise<number>;
    /**
     * 删除本地所有 channel 特定时间之前的消息
     * @param targetId  会话 ID
     * @param timestamp 时间戳
     * @return 当次接口操作的状态码。0 代表调用成功 具体结果需要实现接口回调，非 0 代表当前接口调用操作失败，不会触发接口回调，详细错误参考错误码
     * @listener [onUltraGroupMessagesClearedForAllChannel]
     */
    clearUltraGroupMessagesForAllChannel(targetId: string, timestamp: number): Promise<number>;
    /**
     * 从服务获取批量消息
     * @param messages 获取的消息集合
     * @return 当次接口操作的状态码。0 代表调用成功 具体结果需要实现接口回调，非 0 代表当前接口调用操作失败，不会触发接口回调，详细错误参考错误码
     * @listener [onBatchRemoteUltraGroupMessagesLoaded]
     */
    loadBatchRemoteUltraGroupMessages(messages: Array<RCIMIWMessage>): Promise<number>;
    /**
     * 更新超级群消息扩展信息
     * @param messageUId 消息的 messageUid，可在消息对象中获取，且只有发送成功的消息才会有值
     * @param expansion  更新的消息扩展信息键值对，类型是 HashMap；Key 支持大小写英文字母、数字、部分特殊符号 + = - _ 的组合方式，不支持汉字。Value 可以输入空格。
     * @return 当次接口操作的状态码。0 代表调用成功 具体结果需要实现接口回调，非 0 代表当前接口调用操作失败，不会触发接口回调，详细错误参考错误码
     * @listener [onUltraGroupMessageExpansionUpdated]
     */
    updateUltraGroupMessageExpansion(messageUId: string, expansion: {
        [propName: string]: string;
    }): Promise<number>;
    /**
     * 删除超级群消息扩展信息中特定的键值对
     * @param messageUId 消息的 messageUid，可在消息对象中获取，且只有发送成功的消息才会有值
     * @param keys       消息扩展信息中待删除的 key 的列表，类型是 ArrayList
     * @return 当次接口操作的状态码。0 代表调用成功 具体结果需要实现接口回调，非 0 代表当前接口调用操作失败，不会触发接口回调，详细错误参考错误码
     * @listener [onUltraGroupMessageExpansionRemoved]
     */
    removeUltraGroupMessageExpansion(messageUId: string, keys: Array<string>): Promise<number>;
    /**
     * 修改日志等级
     * @param level 日志级别
     * @return 当次接口操作的状态码。0 代表调用成功 具体结果需要实现接口回调，非 0 代表当前接口调用操作失败，不会触发接口回调，详细错误参考错误码
     */
    changeLogLevel(level: RCIMIWLogLevel): Promise<number>;
    /**
     * 收到消息的监听
     */
    setOnMessageReceivedListener(listener?: (res: OnMessageReceivedResult) => void): void;
    /**
     * 网络状态变化
     */
    setOnConnectionStatusChangedListener(listener?: (res: OnConnectionStatusChangedResult) => void): void;
    /**
     * 会话状态置顶多端同步监听
     */
    setOnConversationTopStatusSyncedListener(listener?: (res: OnConversationTopStatusSyncedResult) => void): void;
    /**
     * 撤回消息监听器
     */
    setOnRemoteMessageRecalledListener(listener?: (res: OnRemoteMessageRecalledResult) => void): void;
    /**
     * 单聊中收到消息回执的回调。
     */
    setOnPrivateReadReceiptReceivedListener(listener?: (res: OnPrivateReadReceiptReceivedResult) => void): void;
    /**
     * 消息扩展信息更改的回调
     */
    setOnRemoteMessageExpansionUpdatedListener(listener?: (res: OnRemoteMessageExpansionUpdatedResult) => void): void;
    /**
     * 消息扩展信息删除的回调
     */
    setOnRemoteMessageExpansionForKeyRemovedListener(listener?: (res: OnRemoteMessageExpansionForKeyRemovedResult) => void): void;
    /**
     * 聊天室用户进入、退出聊天室监听
     */
    setOnChatRoomMemberChangedListener(listener?: (res: OnChatRoomMemberChangedResult) => void): void;
    /**
     * 会话输入状态发生变化。对于单聊而言，当对方正在输入时，监听会触发一次；当对方不处于输入状态时，该监听还会触发一次，但回调里输入用户列表为空。
     */
    setOnTypingStatusChangedListener(listener?: (res: OnTypingStatusChangedResult) => void): void;
    /**
     * 同步消息未读状态监听接口。多端登录，收到其它端清除某一会话未读数通知的时候
     */
    setOnConversationReadStatusSyncMessageReceivedListener(listener?: (res: OnConversationReadStatusSyncMessageReceivedResult) => void): void;
    /**
     * 聊天室 KV 同步完成的回调
     */
    setOnChatRoomEntriesSyncedListener(listener?: (res: OnChatRoomEntriesSyncedResult) => void): void;
    /**
     * 聊天室 KV 发生变化的回调
     */
    setOnChatRoomEntriesChangedListener(listener?: (res: OnChatRoomEntriesChangedResult) => void): void;
    /**
     * 超级群消息 kv 被更新
     */
    setOnRemoteUltraGroupMessageExpansionUpdatedListener(listener?: (res: OnRemoteUltraGroupMessageExpansionUpdatedResult) => void): void;
    /**
     * 超级群消息被更改
     */
    setOnRemoteUltraGroupMessageModifiedListener(listener?: (res: OnRemoteUltraGroupMessageModifiedResult) => void): void;
    /**
     * 超级群消息被撤回
     */
    setOnRemoteUltraGroupMessageRecalledListener(listener?: (res: OnRemoteUltraGroupMessageRecalledResult) => void): void;
    /**
     * 超级群已读的监听
     */
    setOnUltraGroupReadTimeReceivedListener(listener?: (res: OnUltraGroupReadTimeReceivedResult) => void): void;
    /**
 * 用户输入状态变化的回调
      当客户端收到用户输入状态的变化时，会回调此接口，通知发生变化的会话以及当前正在输入的RCUltraGroupTypingStatusInfo列表
 */
    setOnUltraGroupTypingStatusChangedListener(listener?: (res: OnUltraGroupTypingStatusChangedResult) => void): void;
    /**
     * 发送含有敏感词消息被拦截的回调
     */
    setOnMessageBlockedListener(listener?: (res: OnMessageBlockedResult) => void): void;
    /**
     * 聊天室状态发生变化的监听
     */
    setOnChatRoomStatusChangedListener(listener?: (res: OnChatRoomStatusChangedResult) => void): void;
    /**
     * 收到群聊已读回执请求的监听
     */
    setOnGroupMessageReadReceiptRequestReceivedListener(listener?: (res: OnGroupMessageReadReceiptRequestReceivedResult) => void): void;
    /**
     * 收到群聊已读回执响应的监听
     */
    setOnGroupMessageReadReceiptResponseReceivedListener(listener?: (res: OnGroupMessageReadReceiptResponseReceivedResult) => void): void;
    /**
     * [connect] 的接口监听，收到链接结果的回调
     */
    setOnConnectedListener(listener?: (res: OnConnectedResult) => void): void;
    /**
     * [connect] 的接口监听，数据库打开时发生的回调
     */
    setOnDatabaseOpenedListener(listener?: (res: OnDatabaseOpenedResult) => void): void;
    /**
     * [loadConversation] 的接口监听
     */
    setOnConversationLoadedListener(listener?: (res: OnConversationLoadedResult) => void): void;
    /**
     * [loadConversations] 的接口监听
     */
    setOnConversationsLoadedListener(listener?: (res: OnConversationsLoadedResult) => void): void;
    /**
     * [removeConversation] 的接口监听
     */
    setOnConversationRemovedListener(listener?: (res: OnConversationRemovedResult) => void): void;
    /**
     * [removeConversations] 的接口监听
     */
    setOnConversationsRemovedListener(listener?: (res: OnConversationsRemovedResult) => void): void;
    /**
     * [loadTotalUnreadCount] 的接口监听
     */
    setOnTotalUnreadCountLoadedListener(listener?: (res: OnTotalUnreadCountLoadedResult) => void): void;
    /**
     * [loadUnreadCount] 的接口监听
     */
    setOnUnreadCountLoadedListener(listener?: (res: OnUnreadCountLoadedResult) => void): void;
    /**
     * [loadUnreadCountByConversationTypes] 的接口监听
     */
    setOnUnreadCountByConversationTypesLoadedListener(listener?: (res: OnUnreadCountByConversationTypesLoadedResult) => void): void;
    /**
     * [loadUnreadMentionedCount] 的接口监听
     */
    setOnUnreadMentionedCountLoadedListener(listener?: (res: OnUnreadMentionedCountLoadedResult) => void): void;
    /**
     * [loadUltraGroupAllUnreadMentionedCount] 的接口监听
     */
    setOnUltraGroupAllUnreadCountLoadedListener(listener?: (res: OnUltraGroupAllUnreadCountLoadedResult) => void): void;
    /**
     * [loadUltraGroupAllUnreadMentionedCount] 的接口监听
     */
    setOnUltraGroupAllUnreadMentionedCountLoadedListener(listener?: (res: OnUltraGroupAllUnreadMentionedCountLoadedResult) => void): void;
    /**
     * [clearUnreadCount] 的接口监听
     */
    setOnUnreadCountClearedListener(listener?: (res: OnUnreadCountClearedResult) => void): void;
    /**
     * [saveDraftMessage] 的接口监听
     */
    setOnDraftMessageSavedListener(listener?: (res: OnDraftMessageSavedResult) => void): void;
    /**
     * [clearDraftMessage] 的接口监听
     */
    setOnDraftMessageClearedListener(listener?: (res: OnDraftMessageClearedResult) => void): void;
    /**
     * [loadDraftMessage] 的接口监听
     */
    setOnDraftMessageLoadedListener(listener?: (res: OnDraftMessageLoadedResult) => void): void;
    /**
     * [loadBlockedConversations] 的接口监听
     */
    setOnBlockedConversationsLoadedListener(listener?: (res: OnBlockedConversationsLoadedResult) => void): void;
    /**
     * [changeConversationTopStatus] 的接口监听
     */
    setOnConversationTopStatusChangedListener(listener?: (res: OnConversationTopStatusChangedResult) => void): void;
    /**
     * [loadConversationTopStatus] 的接口监听
     */
    setOnConversationTopStatusLoadedListener(listener?: (res: OnConversationTopStatusLoadedResult) => void): void;
    /**
     * [syncConversationReadStatus] 的接口监听
     */
    setOnConversationReadStatusSyncedListener(listener?: (res: OnConversationReadStatusSyncedResult) => void): void;
    /**
     * [sendMessage] 的接口监听
     */
    setOnMessageAttachedListener(listener?: (res: OnMessageAttachedResult) => void): void;
    /**
     * [sendMessage] 的接口监听
     */
    setOnMessageSentListener(listener?: (res: OnMessageSentResult) => void): void;
    /**
     * [sendMediaMessage] 的接口监听
     */
    setOnMediaMessageAttachedListener(listener?: (res: OnMediaMessageAttachedResult) => void): void;
    /**
     * [sendMediaMessage] 的接口监听
     */
    setOnMediaMessageSendingListener(listener?: (res: OnMediaMessageSendingResult) => void): void;
    /**
     * [cancelSendingMediaMessage] 的接口监听
     */
    setOnSendingMediaMessageCanceledListener(listener?: (res: OnSendingMediaMessageCanceledResult) => void): void;
    /**
     * [sendMediaMessage] 的接口监听
     */
    setOnMediaMessageSentListener(listener?: (res: OnMediaMessageSentResult) => void): void;
    /**
     * [downloadMediaMessage] 的接口监听
     */
    setOnMediaMessageDownloadingListener(listener?: (res: OnMediaMessageDownloadingResult) => void): void;
    /**
     * [downloadMediaMessage] 的接口监听
     */
    setOnMediaMessageDownloadedListener(listener?: (res: OnMediaMessageDownloadedResult) => void): void;
    /**
     * [cancelDownloadingMediaMessage] 的接口监听
     */
    setOnDownloadingMediaMessageCanceledListener(listener?: (res: OnDownloadingMediaMessageCanceledResult) => void): void;
    /**
     * [loadMessages] 的接口监听
     */
    setOnMessagesLoadedListener(listener?: (res: OnMessagesLoadedResult) => void): void;
    /**
     * [loadUnreadMentionedMessages] 的接口监听
     */
    setOnUnreadMentionedMessagesLoadedListener(listener?: (res: OnUnreadMentionedMessagesLoadedResult) => void): void;
    /**
     * [loadFirstUnreadMessage] 的接口监听
     */
    setOnFirstUnreadMessageLoadedListener(listener?: (res: OnFirstUnreadMessageLoadedResult) => void): void;
    /**
     * [insertMessage] 的接口监听
     */
    setOnMessageInsertedListener(listener?: (res: OnMessageInsertedResult) => void): void;
    /**
     * [insertMessages] 的接口监听
     */
    setOnMessagesInsertedListener(listener?: (res: OnMessagesInsertedResult) => void): void;
    /**
     * [clearMessages] 的接口监听
     */
    setOnMessageClearedListener(listener?: (res: OnMessageClearedResult) => void): void;
    /**
     * [deleteLocalMessages] 的接口监听
     */
    setOnLocalMessagesDeletedListener(listener?: (res: OnLocalMessagesDeletedResult) => void): void;
    /**
     * [deleteMessages] 的接口监听
     */
    setOnMessagesDeletedListener(listener?: (res: OnMessagesDeletedResult) => void): void;
    /**
     * [recallMessage] 的接口监听
     */
    setOnMessageRecalledListener(listener?: (res: OnMessageRecalledResult) => void): void;
    /**
     * [sendPrivateReadReceiptMessage] 的接口监听
     */
    setOnPrivateReadReceiptMessageSentListener(listener?: (res: OnPrivateReadReceiptMessageSentResult) => void): void;
    /**
     * [updateMessageExpansion] 的接口监听
     */
    setOnMessageExpansionUpdatedListener(listener?: (res: OnMessageExpansionUpdatedResult) => void): void;
    /**
     * [removeMessageExpansionForKeys] 的接口监听
     */
    setOnMessageExpansionForKeysRemovedListener(listener?: (res: OnMessageExpansionForKeysRemovedResult) => void): void;
    /**
     * [changeMessageReceiveStatus] 的接口监听
     */
    setOnMessageReceiveStatusChangedListener(listener?: (res: OnMessageReceiveStatusChangedResult) => void): void;
    /**
     * [changeMessageSentStatus] 的接口监听
     */
    setOnMessageSentStatusChangedListener(listener?: (res: OnMessageSentStatusChangedResult) => void): void;
    /**
     * [joinChatRoom] 的接口监听
     */
    setOnChatRoomJoinedListener(listener?: (res: OnChatRoomJoinedResult) => void): void;
    /**
     * 正在加入聊天室的回调
     */
    setOnChatRoomJoiningListener(listener?: (res: OnChatRoomJoiningResult) => void): void;
    /**
     * [leaveChatRoom] 的接口监听
     */
    setOnChatRoomLeftListener(listener?: (res: OnChatRoomLeftResult) => void): void;
    /**
     * [loadChatRoomMessages] 的接口监听
     */
    setOnChatRoomMessagesLoadedListener(listener?: (res: OnChatRoomMessagesLoadedResult) => void): void;
    /**
     * [addChatRoomEntry] 的接口监听
     */
    setOnChatRoomEntryAddedListener(listener?: (res: OnChatRoomEntryAddedResult) => void): void;
    /**
     * [addChatRoomEntries] 的接口监听
     */
    setOnChatRoomEntriesAddedListener(listener?: (res: OnChatRoomEntriesAddedResult) => void): void;
    /**
     * [loadChatRoomEntry] 的接口监听
     */
    setOnChatRoomEntryLoadedListener(listener?: (res: OnChatRoomEntryLoadedResult) => void): void;
    /**
     * [loadAllChatRoomEntries] 的接口监听
     */
    setOnAllChatRoomEntriesLoadedListener(listener?: (res: OnAllChatRoomEntriesLoadedResult) => void): void;
    /**
     * [removeChatRoomEntry] 的接口监听
     */
    setOnChatRoomEntryRemovedListener(listener?: (res: OnChatRoomEntryRemovedResult) => void): void;
    /**
     * [removeChatRoomEntries] 的接口监听
     */
    setOnChatRoomEntriesRemovedListener(listener?: (res: OnChatRoomEntriesRemovedResult) => void): void;
    /**
     * [addToBlacklist] 的接口监听
     */
    setOnBlacklistAddedListener(listener?: (res: OnBlacklistAddedResult) => void): void;
    /**
     * [removeFromBlacklist] 的接口监听
     */
    setOnBlacklistRemovedListener(listener?: (res: OnBlacklistRemovedResult) => void): void;
    /**
     * [loadBlacklistStatus] 的接口监听
     */
    setOnBlacklistStatusLoadedListener(listener?: (res: OnBlacklistStatusLoadedResult) => void): void;
    /**
     * [loadBlacklist] 的接口监听
     */
    setOnBlacklistLoadedListener(listener?: (res: OnBlacklistLoadedResult) => void): void;
    /**
     * [searchMessages] 的接口监听
     */
    setOnMessagesSearchedListener(listener?: (res: OnMessagesSearchedResult) => void): void;
    /**
     * [searchMessagesByTimeRange] 的接口监听
     */
    setOnMessagesSearchedByTimeRangeListener(listener?: (res: OnMessagesSearchedByTimeRangeResult) => void): void;
    /**
     * [searchMessagesByUserId] 的接口监听
     */
    setOnMessagesSearchedByUserIdListener(listener?: (res: OnMessagesSearchedByUserIdResult) => void): void;
    /**
     * [searchConversations] 的接口监听
     */
    setOnConversationsSearchedListener(listener?: (res: OnConversationsSearchedResult) => void): void;
    /**
     * sendGroupReadReceiptRequest 的接口监听
     */
    setOnGroupReadReceiptRequestSentListener(listener?: (res: OnGroupReadReceiptRequestSentResult) => void): void;
    /**
     * [sendGroupReadReceiptResponse] 的接口监听
     */
    setOnGroupReadReceiptResponseSentListener(listener?: (res: OnGroupReadReceiptResponseSentResult) => void): void;
    /**
     * [changeNotificationQuietHours] 的接口回调
     */
    setOnNotificationQuietHoursChangedListener(listener?: (res: OnNotificationQuietHoursChangedResult) => void): void;
    /**
     * [removeNotificationQuietHours] 的接口回调
     */
    setOnNotificationQuietHoursRemovedListener(listener?: (res: OnNotificationQuietHoursRemovedResult) => void): void;
    /**
     * [loadNotificationQuietHours] 的接口回调
     */
    setOnNotificationQuietHoursLoadedListener(listener?: (res: OnNotificationQuietHoursLoadedResult) => void): void;
    /**
     * [changeConversationNotificationLevel] 的接口回调
     */
    setOnConversationNotificationLevelChangedListener(listener?: (res: OnConversationNotificationLevelChangedResult) => void): void;
    /**
     * [loadConversationNotificationLevel] 的接口回调
     */
    setOnConversationNotificationLevelLoadedListener(listener?: (res: OnConversationNotificationLevelLoadedResult) => void): void;
    /**
     * [changeConversationTypeNotificationLevel] 的接口回调
     */
    setOnConversationTypeNotificationLevelChangedListener(listener?: (res: OnConversationTypeNotificationLevelChangedResult) => void): void;
    /**
     * [loadConversationTypeNotificationLevel] 的接口回调
     */
    setOnConversationTypeNotificationLevelLoadedListener(listener?: (res: OnConversationTypeNotificationLevelLoadedResult) => void): void;
    /**
     * [changeUltraGroupDefaultNotificationLevel] 的接口回调
     */
    setOnUltraGroupDefaultNotificationLevelChangedListener(listener?: (res: OnUltraGroupDefaultNotificationLevelChangedResult) => void): void;
    /**
     * [loadUltraGroupDefaultNotificationLevel] 的接口回调
     */
    setOnUltraGroupDefaultNotificationLevelLoadedListener(listener?: (res: OnUltraGroupDefaultNotificationLevelLoadedResult) => void): void;
    /**
     * [changeUltraGroupChannelDefaultNotificationLevel] 的接口回调
     */
    setOnUltraGroupChannelDefaultNotificationLevelChangedListener(listener?: (res: OnUltraGroupChannelDefaultNotificationLevelChangedResult) => void): void;
    /**
     * [loadUltraGroupChannelDefaultNotificationLevel] 的接口回调
     */
    setOnUltraGroupChannelDefaultNotificationLevelLoadedListener(listener?: (res: OnUltraGroupChannelDefaultNotificationLevelLoadedResult) => void): void;
    /**
     * [changePushContentShowStatus] 的接口监听
     */
    setOnPushContentShowStatusChangedListener(listener?: (res: OnPushContentShowStatusChangedResult) => void): void;
    /**
     * [changePushLanguage] 的接口监听
     */
    setOnPushLanguageChangedListener(listener?: (res: OnPushLanguageChangedResult) => void): void;
    /**
     * [changePushReceiveStatus] 的接口监听
     */
    setOnPushReceiveStatusChangedListener(listener?: (res: OnPushReceiveStatusChangedResult) => void): void;
    /**
     * [loadMessageCount] 的接口监听
     */
    setOnMessageCountLoadedListener(listener?: (res: OnMessageCountLoadedResult) => void): void;
    /**
     *
     */
    setOnTopConversationsLoadedListener(listener?: (res: OnTopConversationsLoadedResult) => void): void;
    /**
 * [sendGroupMessageToDesignatedUsers] 的接口回调
      消息存入数据库的回调
 */
    setOnGroupMessageToDesignatedUsersAttachedListener(listener?: (res: OnGroupMessageToDesignatedUsersAttachedResult) => void): void;
    /**
 * [sendGroupMessageToDesignatedUsers] 的接口回调
      消息发送完成的回调
 */
    setOnGroupMessageToDesignatedUsersSentListener(listener?: (res: OnGroupMessageToDesignatedUsersSentResult) => void): void;
    /**
     * [syncUltraGroupReadStatus] 的接口监听
     */
    setOnUltraGroupReadStatusSyncedListener(listener?: (res: OnUltraGroupReadStatusSyncedResult) => void): void;
    /**
     * [loadConversationsForAllChannel] 的接口监听
     */
    setOnConversationsLoadedForAllChannelListener(listener?: (res: OnConversationsLoadedForAllChannelResult) => void): void;
    /**
     * [loadUltraGroupUnreadMentionedCount] 的接口监听
     */
    setOnUltraGroupUnreadMentionedCountLoadedListener(listener?: (res: OnUltraGroupUnreadMentionedCountLoadedResult) => void): void;
    setOnUltraGroupUnreadCountLoadedListener(listener?: (res: OnUltraGroupUnreadCountLoadedResult) => void): void;
    /**
     * [modifyUltraGroupMessage] 的接口监听
     */
    setOnUltraGroupMessageModifiedListener(listener?: (res: OnUltraGroupMessageModifiedResult) => void): void;
    /**
     * [recallUltraGroupMessage] 的接口监听
     */
    setOnUltraGroupMessageRecalledListener(listener?: (res: OnUltraGroupMessageRecalledResult) => void): void;
    /**
     * [clearUltraGroupMessages] 的接口监听
     */
    setOnUltraGroupMessagesClearedListener(listener?: (res: OnUltraGroupMessagesClearedResult) => void): void;
    /**
     * [clearUltraGroupMessagesForAllChannel] 的接口监听
     */
    setOnUltraGroupMessagesClearedForAllChannelListener(listener?: (res: OnUltraGroupMessagesClearedForAllChannelResult) => void): void;
    /**
     * [sendUltraGroupTypingStatus] 的接口监听
     */
    setOnUltraGroupTypingStatusSentListener(listener?: (res: OnUltraGroupTypingStatusSentResult) => void): void;
    /**
     * [loadBatchRemoteUltraGroupMessages] 的接口监听
     */
    setOnBatchRemoteUltraGroupMessagesLoadedListener(listener?: (res: OnBatchRemoteUltraGroupMessagesLoadedResult) => void): void;
    /**
     * [updateUltraGroupMessageExpansion] 的接口监听
     */
    setOnUltraGroupMessageExpansionUpdatedListener(listener?: (res: OnUltraGroupMessageExpansionUpdatedResult) => void): void;
    /**
     * [removeUltraGroupMessageExpansion] 的接口监听
     */
    setOnUltraGroupMessageExpansionRemovedListener(listener?: (res: OnUltraGroupMessageExpansionRemovedResult) => void): void;
}
