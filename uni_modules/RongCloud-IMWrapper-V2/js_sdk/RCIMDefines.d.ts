export interface RCIMIWAndroidPushOptions {
    /**
     * Android 平台 Push 唯一标识。
     * 目前支持小米、华为推送平台，默认开发者不需要进行设置。
     * 当消息产生推送时，消息的 messageUId 作为 notificationId 使用。
     */
    notificationId?: string;
    /**
     * 小米的渠道 ID
     * 该条消息针对小米使用的推送渠道。
     */
    channelIdMi?: string;
    /**
     * 华为的渠道 ID
     * 该条消息针对华为使用的推送渠道，如开发者集成了华为推送，需要指定 channelId 时，可向 Android 端研发人员获取，channelId 由开发者自行创建。
     */
    channelIdHW?: string;
    /**
     * OPPO 的渠道 ID。
     * 该条消息针对 OPPO 使用的推送渠道，如开发者集成了 OPPO 推送，需要指定 channelId 时，可向 Android 端研发人员获取，channelId 由开发者自行创建。
     */
    channelIdOPPO?: string;
    /**
     * VIVO 推送通道类型 开发者集成了 VIVO 推送，需要指定推送类型时，可进行设置。
     */
    pushTypeVIVO?: RCIMIWVIVOPushType;
    /**
     * FCM 通知类型推送时所使用的分组 id
     */
    collapseKeyFCM?: string;
    /**
     * FCM 通知类型的推送所使用的通知图片 url
     */
    imageUrlFCM?: string;
    /**
     * 华为推送消息级别
     */
    importanceHW?: RCIMIWImportanceHW;
    /**
     * 华为通知栏消息右侧大图标 URL，如果不设置，则不展示通知栏右侧图标。
     * URL使用的协议必须是HTTPS协议，取值样例：https://example.com/image.png。图标文件须小于 512KB，图标建议规格大小：40dp x 40dp，弧角大小为 8dp，超出建议规格大小的图标会存在图片压缩或显示不全的情况。
     */
    imageUrlHW?: string;
    /**
     * 小米 Large icon 链接
     * Large icon 可以出现在大图版和多字版消息中，显示在右边。国内版仅 MIUI12 以上版本支持，以下版本均不支持；国际版支持。
     * 图片要求：大小 120  120px，格式为 png 或者 jpg 格式
     */
    imageUrlMi?: string;
    /**
     * FCM 通知的频道 ID，该应用程序必须使用此频道 ID 创建一个频道，然后才能收到带有该频道 ID 的任何通知。
     * 如果您未在请求中发送此频道 ID，或者如果应用尚未创建提供的频道 ID，则 FCM 使用应用清单中指定的频道 ID。
     */
    channelIdFCM?: string;
}
export interface RCIMIWMessagePushOptions {
    /**
     * 是否发送通知
     * @return
     */
    disableNotification?: boolean;
    /**
     * 通知栏是否屏蔽通知标题
     * true 不显示通知标题，false 显示通知标题
     * 默认情况下融云单聊消息通知标题为用户名、群聊消息为群名称，设置后不会再显示通知标题。
     * 此属性只针目标用户为iOS 平台时有效，Android 第三方推送平台的通知标题为必填项，所以暂不支持。
     */
    disablePushTitle?: boolean;
    /**
     * 推送标题
     * 默认标题显示规则：内置消息：单聊通知标题显示为发送者名称，群聊通知标题显示为群名称。 自定义消息：默认不显示标题。
     * @return
     */
    pushTitle?: string;
    /**
     * 推送内容。
     * @return
     */
    pushContent?: string;
    /**
     * 远程推送附加信息.
     * @return
     */
    pushData?: string;
    /**
     * 是否强制显示通知详情。 当目标用户设置推送不显示消息详情时， 可通过此功能，强制设置该条消息显示推送详情。
     * @return
     */
    forceShowDetailContent?: boolean;
    /**
     * 推送模板 ID
     * 设置后根据目标用户通过 setPushLanguageCode 设置的语言环境，匹配模板中设置的语言内容进行推送
     * 未匹配成功时使用默认内容进行推送,模板内容在“开发者后台-自定义推送文案”中进行设置 注：RCMessagePushConfig 中的 Title 和 PushContent
     * 优先级高于模板 ID（templateId）中对应的标题和推送内容
     * @return
     */
    templateId?: string;
    /**
     * 如果对端设备是 iOS，设置 isVoIPPush 为 True，会走 VoIP 通道推送 Push。
     * @return
     */
    voIPPush?: boolean;
    /**
     * iOS 平台相关配置
     * @return
     */
    iOSPushOptions?: RCIMIWIOSPushOptions;
    /**
     * Android 平台相关配置
     * @return
     */
    androidPushOptions?: RCIMIWAndroidPushOptions;
}
export interface RCIMIWIOSPushOptions {
    /**
     * iOS 平台通知栏分组 ID 相同的 thread-id 推送分为一组 iOS10 开始支持
     * @return
     */
    threadId?: string;
    /**
     * iOS 富文本推送的类型开发者自己定义，自己在 App 端进行解析判断，与 richMediaUri 一起使用，当设置 category 后，推送时默认携带 mutable-content 进行推送，属性值为 1。
     * 如果不设置后台默认取消息类型字符串，如RC:TxtMsg
     * @return
     */
    category?: string;
    /**
     * iOS 平台通知覆盖 ID apnsCollapseId 相同时，新收到的通知会覆盖老的通知，最大 64 字节 iOS10 开始支持
     * @return
     */
    apnsCollapseId?: string;
    /**
     * iOS 富文本推送内容的 URL，与 category 一起使用。
     * @return
     */
    richMediaUri?: string;
}
export interface RCIMIWCompressOptions {
    /**
     * 原图压缩比
     */
    originalImageQuality?: number;
    /**
     * 原图最长边的最大宽度
     */
    originalImageSize?: number;
    /**
     * 原图大小限制 配置发送图片时，如果图片大小不超过则发送原图
     */
    originalImageMaxSize?: number;
    /**
     * 缩略图压缩比例
     */
    thumbnailQuality?: number;
    /**
     * 缩略图压缩宽、高
     */
    thumbnailMaxSize?: number;
    /**
     * 缩略图压缩最小宽、高
     */
    thumbnailMinSize?: number;
    /**
     * 小视频压缩宽度,建议使用16的倍数
     */
    sightCompressWidth?: number;
    /**
     * 小视频压缩高度，建议使用16的倍数
     */
    sightCompressHeight?: number;
    locationThumbnailQuality?: number;
    locationThumbnailWidth?: number;
    locationThumbnailHeight?: number;
}
export interface RCIMIWEngineOptions {
    /**
     * 私有部署的导航服务器地址。
     */
    naviServer?: string;
    /**
     * 私有部署的媒体服务器地址，即文件和图片的上传地址。使用私有云时必须填写。
     */
    fileServer?: string;
    /**
     * 配置数据上传地址
     */
    statisticServer?: string;
    /**
     * 设置断线重连时是否踢出重连设备。
     * 用户没有开通多设备登录功能的前提下，同一个账号在一台新设备上登录的时候，会把这个账号在之前登录的设备上踢出。
     */
    kickReconnectDevice?: boolean;
    /**
     * 压缩项配置
     */
    compressOptions?: RCIMIWCompressOptions;
    pushOptions?: RCIMIWPushOptions;
}
export interface RCIMIWUnknownMessage extends RCIMIWMessage {
    /**
     * 消息数据
     */
    rawData?: string;
    /**
     * 消息的标识
     */
    objectName?: string;
}
export interface RCIMIWUserInfo {
    /**
     * 用户 id。
     * @return
     */
    userId?: string;
    /**
     * 名称（昵称）。
     * @return
     */
    name?: string;
    /**
     * 用户头像地址。
     * @return
     */
    portrait?: string;
    /**
     * 备注
     * @return
     */
    alias?: string;
    /**
     * 附加信息。
     * @return
     */
    extra?: string;
}
export interface RCIMIWCustomMessage extends RCIMIWMessage {
    /**
     * 自定义消息的标识符
     */
    identifier?: string;
    /**
     * 自定义的消息存储策略
     * @return
     */
    policy?: RCIMIWCustomMessagePolicy;
    /**
     * 自定义消息的键值对
     * @return
     */
    fields?: {
        [propName: string]: string;
    };
}
export interface RCIMIWMessage {
    /**
     * 会话类型
     */
    conversationType?: RCIMIWConversationType;
    /**
     * 消息的类型
     * @return
     */
    messageType?: RCIMIWMessageType;
    /**
     * 会话 ID
     */
    targetId?: string;
    /**
     * 所属会话的业务标识，长度限制 20 字符
     * @return
     */
    channelId?: string;
    /**
     * 本地存储的消息的唯一值（数据库索引唯一值）
     * @return
     */
    messageId?: number;
    /**
     * 服务器消息唯一 ID（在同一个 Appkey 下全局唯一）
     */
    messageUId?: string;
    /**
     * 是否是离线消息，只在接收消息的回调方法中有效，如果消息为离线消息，则为 YES ，其他情况均为 NO
     */
    offLine?: boolean;
    /**
     * 群阅读回执状态
     */
    groupReadReceiptInfo?: RCIMIWGroupReadReceiptInfo;
    /**
     * 消息的接收时间（Unix 时间戳、毫秒）
     */
    receivedTime?: number;
    /**
     * 消息的发送时间（Unix 时间戳、毫秒）
     */
    sentTime?: number;
    /**
     * 消息的接收状态
     */
    receivedStatus?: RCIMIWReceivedStatus;
    /**
     * 消息的发送状态
     */
    sentStatus?: RCIMIWSentStatus;
    /**
     * 消息的发送者 ID
     */
    senderUserId?: string;
    /**
     * 消息的方向
     */
    direction?: RCIMIWMessageDirection;
    /**
     * 消息携带的用户信息
     */
    userInfo?: RCIMIWUserInfo;
    /**
     * 消息的 @ 信息
     * @return
     */
    mentionedInfo?: RCIMIWMentionedInfo;
    /**
     * 消息推送配置
     */
    pushOptions?: RCIMIWMessagePushOptions;
    /**
     * 消息的附加字段
     */
    extra?: string;
    /**
     * 消息扩展信息列表，该属性在消息发送时确定，发送之后不能再做修改
     * 扩展信息只支持单聊和群组，其它会话类型不能设置扩展信息
     * 默认消息扩展字典 key 长度不超过 32 ，value 长度不超过 4096 ，单次设置扩展数量最大为 20，消息的扩展总数不能超过 300
     */
    expansion?: {
        [propName: string]: string;
    };
}
export interface RCIMIWImageMessage extends RCIMIWMediaMessage {
    /**
     * 图片的缩略图数据
     */
    thumbnailBase64String?: string;
    /**
     * 是否为原图
     */
    original?: boolean;
}
export interface RCIMIWFileMessage extends RCIMIWMediaMessage {
    /**
     * 文件名
     */
    name?: string;
    /**
     * 文件类型
     */
    fileType?: string;
    /**
     * 文件大小，单位为 Byte
     */
    size?: number;
}
export interface RCIMIWRecallNotificationMessage extends RCIMIWMessage {
    /**
     * 是否是管理员操作
     */
    admin?: boolean;
    /**
     * 是否删除
     */
    deleted?: boolean;
    /**
     * 撤回的时间（毫秒）
     */
    recallTime?: number;
    /**
     * 撤回动作的时间（毫秒）
     */
    recallActionTime?: number;
    /**
     * 被撤回的原消息
     */
    originalMessage?: RCIMIWMessage;
}
export interface RCIMIWMediaMessage extends RCIMIWMessage {
    /**
     * 本地路径
     */
    local?: string;
    /**
     * 远端路径
     */
    remote?: string;
}
export interface RCIMIWTextMessage extends RCIMIWMessage {
    /**
     * 文本内容
     */
    text?: string;
}
export interface RCIMIWGIFMessage extends RCIMIWMediaMessage {
    /**
     * GIF 图的大小，单位字节
     */
    dataSize?: number;
    /**
     * GIF 图的宽
     */
    width?: number;
    /**
     * GIF 图的高
     */
    height?: number;
}
export interface RCIMIWCommandMessage extends RCIMIWMessage {
    /**
     * 命令的名称
     */
    name?: string;
    /**
     * 命令的扩展数据，可以为任意字符串，如存放您定义的json数据。
     */
    data?: string;
}
export interface RCIMIWVoiceMessage extends RCIMIWMediaMessage {
    /**
     * 语音的长度，单位：秒
     */
    duration?: number;
}
export interface RCIMIWMentionedInfo {
    /**
     * @ 提醒的类型
     */
    type?: RCIMIWMentionedType;
    /**
     * @ 的用户 ID 列表
     */
    userIdList?: Array<string>;
    /**
     * 包含 @ 提醒的消息，本地通知和远程推送显示的内容
     */
    mentionedContent?: string;
}
export interface RCIMIWCommandNotificationMessage extends RCIMIWMessage {
    /**
     * 命令提醒的名称
     */
    name?: string;
    /**
     * 命令提醒消息的扩展数据，可以为任意字符串，如存放您定义的 json 数据。
     */
    data?: string;
}
export interface RCIMIWSightMessage extends RCIMIWMediaMessage {
    /**
     * 视频时长
     */
    duration?: number;
    /**
     * 视频大小
     */
    size?: number;
    /**
     * 视频的名称
     */
    name?: string;
    /**
     * 缩略图数据
     */
    thumbnailBase64String?: string;
}
export interface RCIMIWLocationMessage extends RCIMIWMessage {
    /**
     * 经度信息
     * @return
     */
    longitude?: number;
    /**
     * 纬度信息
     * @return
     */
    latitude?: number;
    /**
     * POI 信息
     * @return
     */
    poiName?: string;
    /**
     * 缩略图地址
     * @return
     */
    thumbnailPath?: string;
}
export interface RCIMIWReferenceMessage extends RCIMIWMessage {
    /**
     * 引用文本
     */
    text?: string;
    /**
     * 被引用的消息
     */
    referenceMessage?: RCIMIWMessage;
}
export interface RCIMIWBlockedMessageInfo {
    /**
     * 封禁的会话类型
     */
    conversationType?: RCIMIWConversationType;
    /**
     * 封禁的会话 ID
     */
    targetId?: string;
    /**
     * 封禁的消息 Uid
     */
    blockedMsgUId?: string;
    /**
     * 封禁的类型
     */
    blockType?: RCIMIWMessageBlockType;
    /**
     * 封禁的附加信息
     */
    extra?: string;
}
export interface RCIMIWTypingStatus {
    /**
     * 当前正在输入的用户 ID
     * @return
     */
    userId?: string;
    /**
     * 当前正在输入的消息类型名
     * @return
     */
    contentType?: string;
    /**
     * 输入时间
     * @return
     */
    sentTime?: number;
}
export interface RCIMIWUltraGroupTypingStatusInfo {
    /**
     * 会话 ID
     */
    targetId?: string;
    /**
     * 所属会话的业务标识
     */
    channelId?: string;
    /**
     * 用户id
     * @return
     */
    userId?: string;
    /**
     * 用户数
     * @return
     */
    userNums?: number;
    /**
     * 输入状态
     * @return
     */
    status?: RCIMIWUltraGroupTypingStatus;
    /**
     * 服务端收到用户操作的上行时间.
     * @return
     */
    timestamp?: number;
}
export interface RCIMIWGroupReadReceiptInfo {
    /**
     * 是否为需要回执的消息。 true: 需要回执的消息。 false: 普通消息。
     */
    readReceiptMessage?: boolean;
    /**
     * 是否发送过消息回执响应。 仅对消息接收方有效。
     */
    hasRespond?: boolean;
    /**
     * 会话中响应过该消息回执的成员 userId 列表。 key: userId value: respondTime
     */
    respondUserIds?: {
        [propName: string]: number;
    };
}
export interface RCIMIWChatRoomMemberAction {
    /**
     * 操作的用户
     */
    userId?: string;
    /**
     * 事件类型
     */
    actionType?: RCIMIWChatRoomMemberActionType;
}
export interface RCIMIWSearchConversationResult {
    /**
     * 获取会话的实体，用来容纳和存储客户端的会话信息，对应会话列表中的会话。
     */
    conversation?: RCIMIWConversation;
    /**
     * 获取匹配会话数量
     */
    count?: number;
}
export interface RCIMIWConversation {
    /**
     * 获取会话类型
     */
    conversationType?: RCIMIWConversationType;
    /**
     * 会话 ID
     * @return
     */
    targetId?: string;
    /**
     * 获取渠道 ID
     * @return
     */
    channelId?: string;
    /**
     * 获取未读消息数。
     */
    unreadCount?: number;
    /**
     * 获取本会话里自己被 @ 的消息数量。
     */
    mentionedCount?: number;
    /**
     * 获取置顶状态
     */
    top?: boolean;
    /**
     * 会话草稿
     * @return
     */
    draft?: string;
    /**
     * 获取最后一条消息
     */
    lastMessage?: RCIMIWMessage;
    /**
     * 会话的通知级别
     * @return
     */
    notificationLevel?: RCIMIWPushNotificationLevel;
}
export interface RCIMIWPushOptions {
    idMI?: string;
    appKeyMI?: string;
    appIdMeizu?: string;
    appKeyMeizu?: string;
    appKeyOPPO?: string;
    appSecretOPPO?: string;
    enableHWPush?: boolean;
    enableFCM?: boolean;
    enableVIVOPush?: boolean;
}
export declare enum RCIMIWImportanceHW {
    /**
     * 表示消息为服务与通讯类。消息提醒方式为锁屏+铃声+震动。
     */
    normal = 0,
    /**
     * 表示消息为资讯营销类。消息提醒方式为静默通知，仅在下拉通知栏展示。
     */
    low = 1
}
export declare enum RCIMIWMessageOperationPolicy {
    /**
     * 本地
     */
    local = 0,
    /**
     * 远端
     */
    remote = 1,
    /**
     * 本地和远端
     */
    localRemote = 2
}
export declare enum RCIMIWVIVOPushType {
    /**
     * 运营消息
     */
    operate = 0,
    /**
     * 系统消息
     */
    system = 1
}
export declare enum RCIMIWSentStatus {
    /**
     * 发送中
     */
    sending = 0,
    /**
     * 发送失败
     */
    failed = 1,
    /**
     * 已发送
     */
    sent = 2,
    /**
     * 对方已接收
     */
    received = 3,
    /**
     * 对方已读
     */
    read = 4,
    /**
     * 对方已销毁
     */
    destroyed = 5,
    /**
     * 对方已取消
     */
    canceled = 6
}
export declare enum RCIMIWPushNotificationQuietHoursLevel {
    /**
     * 未设置（向上查询群或者APP级别设置） 存量数据中0表示未设置
     */
    none = 0,
    /**
     * 群聊超级群仅@消息通知，单聊代表消息不通知
     */
    mentionMessage = 1,
    /**
     * 消息通知被屏蔽，即不接收消息通知
     */
    blocked = 2
}
export declare enum RCIMIWMessageDirection {
    /**
     * 发送方
     */
    send = 0,
    /**
     * 接收方
     */
    receive = 1
}
export declare enum RCIMIWReceivedStatus {
    /**
     * 未读
     */
    unread = 0,
    /**
     * 已读
     */
    read = 1,
    /**
     * 已听
     */
    listened = 2,
    /**
     * 已下载
     */
    downloaded = 3,
    /**
     * 该消息已经被其他登录的多端收取过。（即该消息已经被其他端收取过后。当前端才登录，并重新拉取了这条消息。客户可以通过这个状态更新 UI，比如不再提示）
     */
    retrieved = 4,
    /**
     * 该消息是被多端同时收取的。（即其他端正同时登录，一条消息被同时发往多端。客户可以通过这个状态值更新自己的某些 UI 状态）。
     */
    multipleReceive = 5
}
export declare enum RCIMIWChatRoomMemberActionType {
    /**
     * 未知
     */
    unknown = 0,
    /**
     * 已加入
     */
    join = 1,
    /**
     * 已离开
     */
    leave = 2
}
export declare enum RCIMIWPushNotificationLevel {
    /**
     * 全部消息通知（接收全部消息通知 -- 显示指定关闭免打扰功能）
     */
    allMessage = 0,
    /**
     * 未设置（向上查询群或者APP级别设置）//存量数据中0表示未设置
     */
    none = 1,
    /**
     * 群聊，超级群 @所有人 或者 @成员列表有自己 时通知；单聊代表消息不通知
     */
    mention = 2,
    /**
     * 群聊，超级群 @成员列表有自己时通知，@所有人不通知；单聊代表消息不通知
     */
    mentionUsers = 3,
    /**
     * 群聊，超级群 @所有人通知，其他情况都不通知；单聊代表消息不通知
     */
    mentionAll = 4,
    /**
     * 消息通知被屏蔽，即不接收消息通知
     */
    blocked = 5
}
export declare enum RCIMIWMessageType {
    /**
     * 无效类型
     */
    unknown = 0,
    /**
     * 自定义
     */
    custom = 1,
    /**
     * 文本
     */
    text = 2,
    /**
     * 语音
     */
    voice = 3,
    /**
     * 图片
     */
    image = 4,
    /**
     * 文件
     */
    file = 5,
    /**
     * 小视频
     */
    sight = 6,
    /**
     * GIF 图
     */
    gif = 7,
    /**
     * 撤回
     */
    recall = 8,
    /**
     * 引用
     */
    reference = 9,
    /**
     * 命令
     */
    command = 10,
    /**
     * 命令通知
     */
    commandNotification = 11,
    /**
     * 位置消息
     */
    location = 12
}
export declare enum RCIMIWMessageBlockType {
    /**
     * 未知
     */
    unknown = 0,
    /**
     * 全局敏感词：命中了融云内置的全局敏感词
     */
    global = 1,
    /**
     * 自定义敏感词拦截：命中了客户在融云自定义的敏感词
     */
    custom = 2,
    /**
     * 第三方审核拦截：命中了第三方（数美）或模板路由决定不下发的状态
     */
    thirdParty = 3
}
export declare enum RCIMIWTimeOrder {
    /**
     * 时间递减
     */
    before = 0,
    /**
     * 时间递增
     */
    after = 1
}
export declare enum RCIMIWCustomMessagePolicy {
    /**
     * 客户端不存储，支持离线消息机制，不计入未读消息数
     */
    command = 0,
    /**
     * 客户端存储，支持离线消息机制，且存入服务端历史消息，计入未读消息数
     */
    normal = 1,
    /**
     * 客户端不存储，服务端不存储，不计入未读消息数
     */
    status = 2,
    /**
     * 客户端存储，支持离线消息机制，且存入服务端历史消息，不计入未读消息数
     */
    storage = 3
}
export declare enum RCIMIWChatRoomStatus {
    /**
     * 聊天室被重置
     */
    reset = 0,
    /**
     * 用户调用IM Server API 手动销毁聊天室
     */
    destroyManual = 1,
    /**
     * IM Server 自动销毁聊天室
     */
    destroyAuto = 2
}
export declare enum RCIMIWConversationType {
    /**
     * 暂不支持
     */
    invalid = 0,
    /**
     * 单聊
     */
    private = 1,
    /**
     * 群聊
     */
    group = 2,
    /**
     * 聊天室
     */
    chatroom = 3,
    /**
     * 系统会话
     */
    system = 4,
    /**
     * 超级群
     */
    ultraGroup = 5
}
export declare enum RCIMIWErrorCode {
    success = 0,
    paramError = 1,
    engineDestroyed = 2,
    nativeOperationError = 3,
    resultUnknown = 4
}
export declare enum RCIMIWUltraGroupTypingStatus {
    /**
     * 正在输入文本
     */
    text = 0
}
export declare enum RCIMIWMentionedType {
    /**
     * @ 所有人
     */
    all = 0,
    /**
     * @ 指定的人
     */
    part = 1
}
export declare enum RCIMIWChatRoomEntriesOperationType {
    /**
     * 更新操作
     */
    update = 0,
    /**
     * 删除操作
     */
    remove = 1
}
export declare enum RCIMIWLogLevel {
    /**
     * 不输出任何日志
     */
    none = 0,
    /**
     * 只输出错误的日志
     */
    error = 1,
    /**
     * 输出错误和警告的日志
     */
    warn = 2,
    /**
     * 输出错误、警告和一般的日志
     */
    info = 3,
    /**
     * 输出输出错误、警告和一般的日志以及 debug 日志
     */
    debug = 4,
    /**
     * 输出所有日志
     */
    verbose = 5
}
export declare enum RCIMIWBlacklistStatus {
    /**
     * 未知
     */
    unknown = 0,
    /**
     * 在黑名单中
     */
    inBlacklist = 1,
    /**
     * 不在黑名单
     */
    notInBlacklist = 2
}
export declare enum RCIMIWConnectionStatus {
    /**
     * 网络不可用
     */
    networkUnavailable = 0,
    /**
     * 连接成功
     */
    connected = 1,
    /**
     * 连接中
     */
    connecting = 2,
    /**
     * 未连接
     */
    unconnected = 3,
    /**
     * 用户账户在其他设备登录，本机会被踢掉线
     */
    kickedOfflineByOtherClient = 4,
    /**
     * Token 不正确
     */
    tokenIncorrect = 5,
    /**
     * 用户被开发者后台封禁
     */
    connUserBlocked = 6,
    /**
     * 用户主动调用 disconnect 或 logout 接口断开连接
     */
    signOut = 7,
    /**
     * 连接暂时挂起（多是由于网络问题导致），SDK 会在合适时机进行自动重连
     */
    suspend = 8,
    /**
     * 自动连接超时，SDK 将不会继续连接，用户需要做超时处理，再自行调用 connectWithToken 接口进行连接
     */
    timeout = 9
}
/**
 * 收到消息的监听
 * @param message    接收到的消息对象
 * @param left       当客户端连接成功后，服务端会将所有补偿消息以消息包的形式下发给客户端，最多每 200 条消息为一个消息包，即一个 Package, 客户端接受到消息包后，会逐条解析并通知应用。left 为当前消息包（Package）里还剩余的消息条数
 * @param offline    消息是否离线消息
 * @param hasPackage 是否在服务端还存在未下发的消息包
 */
export interface OnMessageReceivedResult {
    message: RCIMIWMessage;
    left: number;
    offline: boolean;
    hasPackage: boolean;
}
/**
 * 网络状态变化
 * @param status SDK 与融云服务器的连接状态
 */
export interface OnConnectionStatusChangedResult {
    status: RCIMIWConnectionStatus;
}
/**
 * 会话状态置顶多端同步监听
 * @param type      会话类型
 * @param targetId  会话 ID
 * @param channelId 频道 ID，仅支持超级群使用，其他会话类型传 null 即可。 频道 ID，仅支持超级群使用，其他会话类型传 null 即可。
 * @param top       是否置顶
 */
export interface OnConversationTopStatusSyncedResult {
    type: RCIMIWConversationType;
    targetId: string;
    channelId: string;
    top: boolean;
}
/**
 * 撤回消息监听器
 * @param message 原本的消息会变为撤回消息
 */
export interface OnRemoteMessageRecalledResult {
    message: RCIMIWMessage;
}
/**
 * 单聊中收到消息回执的回调。
 * @param targetId  会话 ID
 * @param channelId 频道 ID，仅支持超级群使用，其他会话类型传 null 即可。
 * @param timestamp 已阅读的最后一条消息的 sendTime
 */
export interface OnPrivateReadReceiptReceivedResult {
    targetId: string;
    channelId: string;
    timestamp: number;
}
/**
 * 消息扩展信息更改的回调
 * @param expansion 消息扩展信息中更新的键值对，只包含更新的键值对，不是全部的数据。如果想获取全部的键值对，请使用 message 的 expansion 属性。
 * @param message   发生变化的消息
 */
export interface OnRemoteMessageExpansionUpdatedResult {
    expansion: {
        [propName: string]: string;
    };
    message: RCIMIWMessage;
}
/**
 * 消息扩展信息删除的回调
 * @param message 发生变化的消息
 * @param keys    消息扩展信息中删除的键值对 key 列表
 */
export interface OnRemoteMessageExpansionForKeyRemovedResult {
    message: RCIMIWMessage;
    keys: Array<string>;
}
/**
 * 聊天室用户进入、退出聊天室监听
 * @param targetId 会话 ID
 * @param actions  发生的事件
 */
export interface OnChatRoomMemberChangedResult {
    targetId: string;
    actions: Array<RCIMIWChatRoomMemberAction>;
}
/**
 * 会话输入状态发生变化。对于单聊而言，当对方正在输入时，监听会触发一次；当对方不处于输入状态时，该监听还会触发一次，但回调里输入用户列表为空。
 * @param type             会话类型
 * @param targetId         会话 ID
 * @param channelId        频道 ID，仅支持超级群使用，其他会话类型传 null 即可。
 * @param userTypingStatus 发生状态变化的集合
 */
export interface OnTypingStatusChangedResult {
    type: RCIMIWConversationType;
    targetId: string;
    channelId: string;
    userTypingStatus: Array<RCIMIWTypingStatus>;
}
/**
 * 同步消息未读状态监听接口。多端登录，收到其它端清除某一会话未读数通知的时候
 * @param type     会话类型
 * @param targetId 会话 ID
 */
export interface OnConversationReadStatusSyncMessageReceivedResult {
    type: RCIMIWConversationType;
    targetId: string;
    timestamp: number;
}
/**
 * 聊天室 KV 同步完成的回调
 * @param roomId 聊天室 ID
 */
export interface OnChatRoomEntriesSyncedResult {
    roomId: string;
}
/**
 * 聊天室 KV 发生变化的回调
 * @param operationType 操作的类型
 * @param roomId        聊天室 ID
 * @param entries       发送变化的 KV
 */
export interface OnChatRoomEntriesChangedResult {
    operationType: RCIMIWChatRoomEntriesOperationType;
    roomId: string;
    entries: {
        [propName: string]: string;
    };
}
/**
 * 超级群消息 kv 被更新
 * @param messages 被更新的消息集合
 */
export interface OnRemoteUltraGroupMessageExpansionUpdatedResult {
    messages: Array<RCIMIWMessage>;
}
/**
 * 超级群消息被更改
 * @param messages 被更新的消息集合
 */
export interface OnRemoteUltraGroupMessageModifiedResult {
    messages: Array<RCIMIWMessage>;
}
/**
 * 超级群消息被撤回
 * @param messages 撤回的消息集合
 */
export interface OnRemoteUltraGroupMessageRecalledResult {
    messages: Array<RCIMIWMessage>;
}
/**
 * 超级群已读的监听
 * @param targetId  会话 ID
 * @param channelId 频道 ID，仅支持超级群使用，其他会话类型传 null 即可。
 * @param timestamp
 */
export interface OnUltraGroupReadTimeReceivedResult {
    targetId: string;
    channelId: string;
    timestamp: number;
}
/**
 * 用户输入状态变化的回调
 * 当客户端收到用户输入状态的变化时，会回调此接口，通知发生变化的会话以及当前正在输入的RCUltraGroupTypingStatusInfo列表
 * @param info 正在输入的RCUltraGroupTypingStatusInfo列表（nil标示当前没有用户正在输入）
 */
export interface OnUltraGroupTypingStatusChangedResult {
    info: Array<RCIMIWUltraGroupTypingStatusInfo>;
}
/**
 * 发送含有敏感词消息被拦截的回调
 * @param info 被拦截消息的相关信息
 */
export interface OnMessageBlockedResult {
    info: RCIMIWBlockedMessageInfo;
}
/**
 * 聊天室状态发生变化的监听
 * @param targetId 会话 ID
 * @param status   聊天室变化的状态
 */
export interface OnChatRoomStatusChangedResult {
    targetId: string;
    status: RCIMIWChatRoomStatus;
}
/**
 * 收到群聊已读回执请求的监听
 * @param targetId   会话 ID
 * @param messageUId 消息的 messageUid
 */
export interface OnGroupMessageReadReceiptRequestReceivedResult {
    targetId: string;
    messageUId: string;
}
/**
 * 收到群聊已读回执响应的监听
 * @param targetId       会话 ID
 * @param messageUId     收到回执响应的消息的 messageUId
 * @param respondUserIds 会话中响应了此消息的用户列表。其中 key： 用户 id ； value： 响应时间。
 */
export interface OnGroupMessageReadReceiptResponseReceivedResult {
    targetId: string;
    messageUId: string;
    respondUserIds: {
        [propName: string]: number;
    };
}
/**
 * [connect] 的接口监听，收到链接结果的回调
 * @param code   接口回调的状态码，0 代表成功，非 0 代表出现异常
 * @param userId 链接成功的用户 ID
 */
export interface OnConnectedResult {
    code: number;
    userId: string;
}
/**
 * [connect] 的接口监听，数据库打开时发生的回调
 * @param code 接口回调的状态码，0 代表成功，非 0 代表出现异常
 */
export interface OnDatabaseOpenedResult {
    code: number;
}
/**
 * [loadConversation] 的接口监听
 * @param code         接口回调的状态码，0 代表成功，非 0 代表出现异常
 * @param type         会话类型
 * @param targetId     会话 ID
 * @param channelId    频道 ID，仅支持超级群使用，其他会话类型传 null 即可。
 * @param conversation 获取到的会话
 */
export interface OnConversationLoadedResult {
    code: number;
    type: RCIMIWConversationType;
    targetId: string;
    channelId: string;
    conversation: RCIMIWConversation;
}
/**
 * [loadConversations] 的接口监听
 * @param code              接口回调的状态码，0 代表成功，非 0 代表出现异常
 * @param conversationTypes 会话类型集合
 * @param channelId         频道 ID，仅支持超级群使用，
 * @param startTime         时间戳（毫秒）
 * @param count             查询的数量
 * @param conversations     查询到的会话集合
 */
export interface OnConversationsLoadedResult {
    code: number;
    conversationTypes: Array<RCIMIWConversationType>;
    channelId: string;
    startTime: number;
    count: number;
    conversations: Array<RCIMIWConversation>;
}
/**
 * [removeConversation] 的接口监听
 * @param code      接口回调的状态码，0 代表成功，非 0 代表出现异常
 * @param type      会话类型
 * @param targetId  会话 ID
 * @param channelId 频道 ID，仅支持超级群使用，其他会话类型传 null 即可。
 */
export interface OnConversationRemovedResult {
    code: number;
    type: RCIMIWConversationType;
    targetId: string;
    channelId: string;
}
/**
 * [removeConversations] 的接口监听
 * @param code              接口回调的状态码，0 代表成功，非 0 代表出现异常
 * @param conversationTypes 会话类型集合
 * @param channelId         频道 ID，仅支持超级群使用，其他会话类型传 null 即可。
 */
export interface OnConversationsRemovedResult {
    code: number;
    conversationTypes: Array<RCIMIWConversationType>;
    channelId: string;
}
/**
 * [loadTotalUnreadCount] 的接口监听
 * @param code      接口回调的状态码，0 代表成功，非 0 代表出现异常
 * @param channelId 频道 ID，仅支持超级群使用，其他会话类型传 null 即可。
 * @param count     未读数量
 */
export interface OnTotalUnreadCountLoadedResult {
    code: number;
    channelId: string;
    count: number;
}
/**
 * [loadUnreadCount] 的接口监听
 * @param code      接口回调的状态码，0 代表成功，非 0 代表出现异常
 * @param type      会话类型
 * @param targetId  会话 ID
 * @param channelId 频道 ID，仅支持超级群使用，其他会话类型传 null 即可。
 * @param count     未读数量
 */
export interface OnUnreadCountLoadedResult {
    code: number;
    type: RCIMIWConversationType;
    targetId: string;
    channelId: string;
    count: number;
}
/**
 * [loadUnreadCountByConversationTypes] 的接口监听
 * @param code              接口回调的状态码，0 代表成功，非 0 代表出现异常
 * @param conversationTypes 会话类型集合
 * @param channelId         频道 ID，仅支持超级群使用，其他会话类型传 null 即可。
 * @param contain           是否包含免打扰消息的未读消息数。
 * @param count             未读数量
 */
export interface OnUnreadCountByConversationTypesLoadedResult {
    code: number;
    conversationTypes: Array<RCIMIWConversationType>;
    channelId: string;
    contain: boolean;
    count: number;
}
/**
 * [loadUnreadMentionedCount] 的接口监听
 * @param code      接口回调的状态码，0 代表成功，非 0 代表出现异常
 * @param type      会话类型
 * @param targetId  会话 ID
 * @param channelId 频道 ID，仅支持超级群使用，其他会话类型传 null 即可。
 * @param count     未读数量
 */
export interface OnUnreadMentionedCountLoadedResult {
    code: number;
    type: RCIMIWConversationType;
    targetId: string;
    channelId: string;
    count: number;
}
/**
 * [loadUltraGroupAllUnreadMentionedCount] 的接口监听
 * @param code  接口回调的状态码，0 代表成功，非 0 代表出现异常
 * @param count 未读数量
 */
export interface OnUltraGroupAllUnreadCountLoadedResult {
    code: number;
    count: number;
}
/**
 * [loadUltraGroupAllUnreadMentionedCount] 的接口监听
 * @param code  接口回调的状态码，0 代表成功，非 0 代表出现异常
 * @param count 未读数量
 */
export interface OnUltraGroupAllUnreadMentionedCountLoadedResult {
    code: number;
    count: number;
}
/**
 * [clearUnreadCount] 的接口监听
 * @param code      接口回调的状态码，0 代表成功，非 0 代表出现异常
 * @param type      会话类型
 * @param targetId  会话 ID
 * @param channelId 频道 ID，仅支持超级群使用，其他会话类型传 null 即可。
 * @param timestamp 该会话已阅读的最后一条消息的发送时间戳
 */
export interface OnUnreadCountClearedResult {
    code: number;
    type: RCIMIWConversationType;
    targetId: string;
    channelId: string;
    timestamp: number;
}
/**
 * [saveDraftMessage] 的接口监听
 * @param code      接口回调的状态码，0 代表成功，非 0 代表出现异常
 * @param type      会话类型
 * @param targetId  会话 ID
 * @param channelId 频道 ID，仅支持超级群使用，其他会话类型传 null 即可。
 * @param draft     草稿信息
 */
export interface OnDraftMessageSavedResult {
    code: number;
    type: RCIMIWConversationType;
    targetId: string;
    channelId: string;
    draft: string;
}
/**
 * [clearDraftMessage] 的接口监听
 * @param code      接口回调的状态码，0 代表成功，非 0 代表出现异常
 * @param type      会话类型
 * @param targetId  会话 ID
 * @param channelId 频道 ID，仅支持超级群使用，其他会话类型传 null 即可。
 */
export interface OnDraftMessageClearedResult {
    code: number;
    type: RCIMIWConversationType;
    targetId: string;
    channelId: string;
}
/**
 * [loadDraftMessage] 的接口监听
 * @param code      接口回调的状态码，0 代表成功，非 0 代表出现异常 接口回调的状态码，0 代表成功，非 0 代表出现异常
 * @param type      会话类型
 * @param targetId  会话 ID
 * @param channelId 频道 ID，仅支持超级群使用，其他会话类型传 null 即可。
 * @param draft     草稿信息
 */
export interface OnDraftMessageLoadedResult {
    code: number;
    type: RCIMIWConversationType;
    targetId: string;
    channelId: string;
    draft: string;
}
/**
 * [loadBlockedConversations] 的接口监听
 * @param code              接口回调的状态码，0 代表成功，非 0 代表出现异常
 * @param conversationTypes 会话类型集合
 * @param channelId         频道 ID，仅支持超级群使用，其他会话类型传 null 即可。
 * @param conversations     获取到的会话集合
 */
export interface OnBlockedConversationsLoadedResult {
    code: number;
    conversationTypes: Array<RCIMIWConversationType>;
    channelId: string;
    conversations: Array<RCIMIWConversation>;
}
/**
 * [changeConversationTopStatus] 的接口监听
 * @param code      接口回调的状态码，0 代表成功，非 0 代表出现异常
 * @param type      会话类型
 * @param targetId  会话 ID
 * @param channelId 频道 ID，仅支持超级群使用，其他会话类型传 null 即可。
 * @param top       是否置顶
 */
export interface OnConversationTopStatusChangedResult {
    code: number;
    type: RCIMIWConversationType;
    targetId: string;
    channelId: string;
    top: boolean;
}
/**
 * [loadConversationTopStatus] 的接口监听
 * @param code      接口回调的状态码，0 代表成功，非 0 代表出现异常
 * @param type      会话类型
 * @param targetId  会话 ID
 * @param channelId 频道 ID，仅支持超级群使用，其他会话类型传 null 即可。
 * @param top       是否置顶
 */
export interface OnConversationTopStatusLoadedResult {
    code: number;
    type: RCIMIWConversationType;
    targetId: string;
    channelId: string;
    top: boolean;
}
/**
 * [syncConversationReadStatus] 的接口监听
 * @param code      接口回调的状态码，0 代表成功，非 0 代表出现异常
 * @param type      会话类型
 * @param targetId  会话 ID
 * @param channelId 频道 ID，仅支持超级群使用，其他会话类型传 null 即可。
 * @param timestamp 会话中已读的最后一条消息的发送时间戳
 */
export interface OnConversationReadStatusSyncedResult {
    code: number;
    type: RCIMIWConversationType;
    targetId: string;
    channelId: string;
    timestamp: number;
}
/**
 * [sendMessage] 的接口监听
 * @param message 发送的消息
 */
export interface OnMessageAttachedResult {
    message: RCIMIWMessage;
}
/**
 * [sendMessage] 的接口监听
 * @param code    接口回调的状态码，0 代表成功，非 0 代表出现异常
 * @param message 发送的消息
 */
export interface OnMessageSentResult {
    code: number;
    message: RCIMIWMessage;
}
/**
 * [sendMediaMessage] 的接口监听
 * @param message 发送的消息
 */
export interface OnMediaMessageAttachedResult {
    message: RCIMIWMediaMessage;
}
/**
 * [sendMediaMessage] 的接口监听
 * @param message  发送的消息
 * @param progress 发送的进度
 */
export interface OnMediaMessageSendingResult {
    message: RCIMIWMediaMessage;
    progress: number;
}
/**
 * [cancelSendingMediaMessage] 的接口监听
 * @param code    接口回调的状态码，0 代表成功，非 0 代表出现异常
 * @param message 发送的消息
 */
export interface OnSendingMediaMessageCanceledResult {
    code: number;
    message: RCIMIWMediaMessage;
}
/**
 * [sendMediaMessage] 的接口监听
 * @param code    接口回调的状态码，0 代表成功，非 0 代表出现异常
 * @param message 发送的消息
 */
export interface OnMediaMessageSentResult {
    code: number;
    message: RCIMIWMediaMessage;
}
/**
 * [downloadMediaMessage] 的接口监听
 * @param message  下载的消息
 * @param progress 下载的进度
 */
export interface OnMediaMessageDownloadingResult {
    message: RCIMIWMediaMessage;
    progress: number;
}
/**
 * [downloadMediaMessage] 的接口监听
 * @param code    接口回调的状态码，0 代表成功，非 0 代表出现异常
 * @param message 下载的消息
 */
export interface OnMediaMessageDownloadedResult {
    code: number;
    message: RCIMIWMediaMessage;
}
/**
 * [cancelDownloadingMediaMessage] 的接口监听
 * @param code    接口回调的状态码，0 代表成功，非 0 代表出现异常
 * @param message 取消下载的消息
 */
export interface OnDownloadingMediaMessageCanceledResult {
    code: number;
    message: RCIMIWMediaMessage;
}
/**
 * [loadMessages] 的接口监听
 * @param code      接口回调的状态码，0 代表成功，非 0 代表出现异常
 * @param type      会话类型
 * @param targetId  会话 ID
 * @param channelId 频道 ID，仅支持超级群使用，其他会话类型传 null 即可。
 * @param sentTime  当前消息时间戳
 * @param order     获取消息的方向。BEFORE：获取 sentTime 之前的消息 （时间递减），AFTER：获取 sentTime 之后的消息 （时间递增）
 * @param messages  获取到的消息集合
 */
export interface OnMessagesLoadedResult {
    code: number;
    type: RCIMIWConversationType;
    targetId: string;
    channelId: string;
    sentTime: number;
    order: RCIMIWTimeOrder;
    messages: Array<RCIMIWMessage>;
}
/**
 * [loadUnreadMentionedMessages] 的接口监听
 * @param code      接口回调的状态码，0 代表成功，非 0 代表出现异常
 * @param type      会话类型
 * @param targetId  会话 ID
 * @param channelId 频道 ID，仅支持超级群使用，其他会话类型传 null 即可。
 * @param messages  获取到的消息集合
 */
export interface OnUnreadMentionedMessagesLoadedResult {
    code: number;
    type: RCIMIWConversationType;
    targetId: string;
    channelId: string;
    messages: Array<RCIMIWMessage>;
}
/**
 * [loadFirstUnreadMessage] 的接口监听
 * @param code      接口回调的状态码，0 代表成功，非 0 代表出现异常
 * @param type      会话类型
 * @param targetId  会话 ID
 * @param channelId 频道 ID，仅支持超级群使用，其他会话类型传 null 即可。
 * @param message   获取到的消息
 */
export interface OnFirstUnreadMessageLoadedResult {
    code: number;
    type: RCIMIWConversationType;
    targetId: string;
    channelId: string;
    message: RCIMIWMessage;
}
/**
 * [insertMessage] 的接口监听
 * @param code    接口回调的状态码，0 代表成功，非 0 代表出现异常
 * @param message 插入的消息
 */
export interface OnMessageInsertedResult {
    code: number;
    message: RCIMIWMessage;
}
/**
 * [insertMessages] 的接口监听
 * @param code     接口回调的状态码，0 代表成功，非 0 代表出现异常
 * @param messages 插入的消息集合
 */
export interface OnMessagesInsertedResult {
    code: number;
    messages: Array<RCIMIWMessage>;
}
/**
 * [clearMessages] 的接口监听
 * @param code      接口回调的状态码，0 代表成功，非 0 代表出现异常
 * @param type      会话类型
 * @param targetId  会话 ID
 * @param channelId 频道 ID，仅支持超级群使用，其他会话类型传 null 即可。
 * @param timestamp 时间戳
 */
export interface OnMessageClearedResult {
    code: number;
    type: RCIMIWConversationType;
    targetId: string;
    channelId: string;
    timestamp: number;
}
/**
 * [deleteLocalMessages] 的接口监听
 * @param code     接口回调的状态码，0 代表成功，非 0 代表出现异常
 * @param messages 删除的消息集合
 */
export interface OnLocalMessagesDeletedResult {
    code: number;
    messages: Array<RCIMIWMessage>;
}
/**
 * [deleteMessages] 的接口监听
 * @param code      接口回调的状态码，0 代表成功，非 0 代表出现异常
 * @param type      会话类型
 * @param targetId  会话 ID
 * @param channelId 频道 ID，仅支持超级群使用，其他会话类型传 null 即可。
 * @param messages  删除的消息集合
 */
export interface OnMessagesDeletedResult {
    code: number;
    type: RCIMIWConversationType;
    targetId: string;
    channelId: string;
    messages: Array<RCIMIWMessage>;
}
/**
 * [recallMessage] 的接口监听
 * @param code    接口回调的状态码，0 代表成功，非 0 代表出现异常
 * @param message 撤回的消息
 */
export interface OnMessageRecalledResult {
    code: number;
    message: RCIMIWMessage;
}
/**
 * [sendPrivateReadReceiptMessage] 的接口监听
 * @param code      接口回调的状态码，0 代表成功，非 0 代表出现异常
 * @param targetId  会话 ID
 * @param channelId 频道 ID，仅支持超级群使用，其他会话类型传 null 即可。
 * @param timestamp 时间戳
 */
export interface OnPrivateReadReceiptMessageSentResult {
    code: number;
    targetId: string;
    channelId: string;
    timestamp: number;
}
/**
 * [updateMessageExpansion] 的接口监听
 * @param code       接口回调的状态码，0 代表成功，非 0 代表出现异常
 * @param messageUId 消息的 messageUid
 * @param expansion  要更新的消息扩展信息键值对，类型是 HashMap
 */
export interface OnMessageExpansionUpdatedResult {
    code: number;
    messageUId: string;
    expansion: {
        [propName: string]: string;
    };
}
/**
 * [removeMessageExpansionForKeys] 的接口监听
 * @param code       接口回调的状态码，0 代表成功，非 0 代表出现异常
 * @param messageUId 消息的 messageUid
 * @param keys       消息扩展信息中待删除的 key 的列表，类型是 ArrayList
 */
export interface OnMessageExpansionForKeysRemovedResult {
    code: number;
    messageUId: string;
    keys: Array<string>;
}
/**
 * [changeMessageReceiveStatus] 的接口监听
 * @param code      接口回调的状态码，0 代表成功，非 0 代表出现异常
 * @param messageId 消息的 messageId
 */
export interface OnMessageReceiveStatusChangedResult {
    code: number;
    messageId: number;
}
/**
 * [changeMessageSentStatus] 的接口监听
 * @param code      接口回调的状态码，0 代表成功，非 0 代表出现异常
 * @param messageId 消息的 messageId
 */
export interface OnMessageSentStatusChangedResult {
    code: number;
    messageId: number;
}
/**
 * [joinChatRoom] 的接口监听
 * @param targetId 会话 ID
 */
export interface OnChatRoomJoinedResult {
    code: number;
    targetId: string;
}
/**
 * 正在加入聊天室的回调
 * @param targetId 聊天室 ID
 */
export interface OnChatRoomJoiningResult {
    targetId: string;
}
/**
 * [leaveChatRoom] 的接口监听
 * @param targetId 会话 ID
 */
export interface OnChatRoomLeftResult {
    code: number;
    targetId: string;
}
/**
 * [loadChatRoomMessages] 的接口监听
 * @param code     接口回调的状态码，0 代表成功，非 0 代表出现异常
 * @param targetId 会话 ID
 * @param messages 加载到的消息
 * @param syncTime 下次拉取的时间戳
 */
export interface OnChatRoomMessagesLoadedResult {
    code: number;
    targetId: string;
    messages: Array<RCIMIWMessage>;
    syncTime: number;
}
/**
 * [addChatRoomEntry] 的接口监听
 * @param code     接口回调的状态码，0 代表成功，非 0 代表出现异常
 * @param targetId 会话 ID
 * @param key      聊天室属性名称
 */
export interface OnChatRoomEntryAddedResult {
    code: number;
    targetId: string;
    key: string;
}
/**
 * [addChatRoomEntries] 的接口监听
 * @param code         接口回调的状态码，0 代表成功，非 0 代表出现异常
 * @param targetId     会话 ID
 * @param entries      聊天室属性
 * @param errorEntries 发生错误的属性
 */
export interface OnChatRoomEntriesAddedResult {
    code: number;
    targetId: string;
    entries: {
        [propName: string]: string;
    };
    errorEntries: {
        [propName: string]: number;
    };
}
/**
 * [loadChatRoomEntry] 的接口监听
 * @param code     接口回调的状态码，0 代表成功，非 0 代表出现异常
 * @param targetId 会话 ID
 * @param entry    获取到的属性。
 */
export interface OnChatRoomEntryLoadedResult {
    code: number;
    targetId: string;
    entry: {
        [propName: string]: string;
    };
}
/**
 * [loadAllChatRoomEntries] 的接口监听
 * @param code     接口回调的状态码，0 代表成功，非 0 代表出现异常
 * @param targetId 会话 ID
 * @param entries  获取到的属性集合。
 */
export interface OnAllChatRoomEntriesLoadedResult {
    code: number;
    targetId: string;
    entries: {
        [propName: string]: string;
    };
}
/**
 * [removeChatRoomEntry] 的接口监听
 * @param code     接口回调的状态码，0 代表成功，非 0 代表出现异常
 * @param targetId 会话 ID
 * @param key      聊天室属性键值
 */
export interface OnChatRoomEntryRemovedResult {
    code: number;
    targetId: string;
    key: string;
}
/**
 * [removeChatRoomEntries] 的接口监听
 * @param code     接口回调的状态码，0 代表成功，非 0 代表出现异常
 * @param targetId 会话 ID
 * @param keys     聊天室属性键值集合
 */
export interface OnChatRoomEntriesRemovedResult {
    code: number;
    targetId: string;
    keys: Array<string>;
}
/**
 * [addToBlacklist] 的接口监听
 * @param code   接口回调的状态码，0 代表成功，非 0 代表出现异常
 * @param userId 用户 ID
 */
export interface OnBlacklistAddedResult {
    code: number;
    userId: string;
}
/**
 * [removeFromBlacklist] 的接口监听
 * @param code   接口回调的状态码，0 代表成功，非 0 代表出现异常
 * @param userId 用户 ID
 */
export interface OnBlacklistRemovedResult {
    code: number;
    userId: string;
}
/**
 * [loadBlacklistStatus] 的接口监听
 * @param code   接口回调的状态码，0 代表成功，非 0 代表出现异常
 * @param userId 用户 ID
 * @param status 当前状态
 */
export interface OnBlacklistStatusLoadedResult {
    code: number;
    userId: string;
    status: RCIMIWBlacklistStatus;
}
/**
 * [loadBlacklist] 的接口监听
 * @param code    接口回调的状态码，0 代表成功，非 0 代表出现异常
 * @param userIds 用户 ID 集合
 */
export interface OnBlacklistLoadedResult {
    code: number;
    userIds: Array<string>;
}
/**
 * [searchMessages] 的接口监听
 * @param code      接口回调的状态码，0 代表成功，非 0 代表出现异常
 * @param type      会话类型
 * @param targetId  会话 ID
 * @param channelId 频道 ID，仅支持超级群使用，其他会话类型传 null 即可。
 * @param keyword   搜索的关键字
 * @param startTime 查询 beginTime 之前的消息
 * @param count     查询的数量
 * @param messages  查询到的消息集合
 */
export interface OnMessagesSearchedResult {
    code: number;
    type: RCIMIWConversationType;
    targetId: string;
    channelId: string;
    keyword: string;
    startTime: number;
    count: number;
    messages: Array<RCIMIWMessage>;
}
/**
 * [searchMessagesByTimeRange] 的接口监听
 * @param code      接口回调的状态码，0 代表成功，非 0 代表出现异常
 * @param type      会话类型
 * @param targetId  会话 ID
 * @param channelId 频道 ID，仅支持超级群使用，其他会话类型传 null 即可。
 * @param keyword   搜索的关键字
 * @param startTime 开始时间
 * @param endTime   结束时间
 * @param offset    偏移量
 * @param count     查询的数量
 * @param messages  查询到的消息集合
 */
export interface OnMessagesSearchedByTimeRangeResult {
    code: number;
    type: RCIMIWConversationType;
    targetId: string;
    channelId: string;
    keyword: string;
    startTime: number;
    endTime: number;
    offset: number;
    count: number;
    messages: Array<RCIMIWMessage>;
}
/**
 * [searchMessagesByUserId] 的接口监听
 * @param code      接口回调的状态码，0 代表成功，非 0 代表出现异常
 * @param userId    用户 id
 * @param type      会话类型
 * @param targetId  会话 ID
 * @param channelId 频道 ID，仅支持超级群使用，其他会话类型传 null 即可。
 * @param startTime 查询记录的起始时间
 * @param count     查询的数量
 * @param messages  查询到的消息集合
 */
export interface OnMessagesSearchedByUserIdResult {
    code: number;
    userId: string;
    type: RCIMIWConversationType;
    targetId: string;
    channelId: string;
    startTime: number;
    count: number;
    messages: Array<RCIMIWMessage>;
}
/**
 * [searchConversations] 的接口监听
 * @param code              接口回调的状态码，0 代表成功，非 0 代表出现异常
 * @param conversationTypes 会话类型集合
 * @param channelId         频道 ID，仅支持超级群使用，其他会话类型传 null 即可。
 * @param messageTypes      搜索的消息类型
 * @param keyword           搜索的关键字
 * @param conversations     查询到的会话集合
 */
export interface OnConversationsSearchedResult {
    code: number;
    conversationTypes: Array<RCIMIWConversationType>;
    channelId: string;
    messageTypes: Array<RCIMIWMessageType>;
    keyword: string;
    conversations: Array<RCIMIWSearchConversationResult>;
}
/**
 * sendGroupReadReceiptRequest 的接口监听
 * @param code    接口回调的状态码，0 代表成功，非 0 代表出现异常
 * @param message 需要请求已读回执的消息
 */
export interface OnGroupReadReceiptRequestSentResult {
    code: number;
    message: RCIMIWMessage;
}
/**
 * [sendGroupReadReceiptResponse] 的接口监听
 * @param code      接口回调的状态码，0 代表成功，非 0 代表出现异常
 * @param targetId  会话 ID
 * @param channelId 频道 ID，仅支持超级群使用，其他会话类型传 null 即可。
 * @param messages  会话中需要发送已读回执的消息列表
 */
export interface OnGroupReadReceiptResponseSentResult {
    code: number;
    targetId: string;
    channelId: string;
    messages: Array<RCIMIWMessage>;
}
/**
 * [changeNotificationQuietHours] 的接口回调
 * @param code      接口回调的状态码，0 代表成功，非 0 代表出现异常
 * @param startTime 开始消息免打扰时间
 * @param spanMins  需要消息免打扰分钟数，0 < spanMins < 1440（ 比如，您设置的起始时间是 00：00， 结束时间为 01:00，则 spanMins 为 60 分钟。设置为 1439 代表全天免打扰 （23  60 + 59 = 1439 ））
 */
export interface OnNotificationQuietHoursChangedResult {
    code: number;
    startTime: string;
    spanMins: number;
    level: RCIMIWPushNotificationQuietHoursLevel;
}
/**
 * [removeNotificationQuietHours] 的接口回调
 * @param code 接口回调的状态码，0 代表成功，非 0 代表出现异常
 */
export interface OnNotificationQuietHoursRemovedResult {
    code: number;
}
/**
 * [loadNotificationQuietHours] 的接口回调
 * @param code      接口回调的状态码，0 代表成功，非 0 代表出现异常
 * @param startTime 开始消息免打扰时间
 * @param spanMins  已设置的屏蔽时间分钟数，0 < spanMins < 1440]
 */
export interface OnNotificationQuietHoursLoadedResult {
    code: number;
    startTime: string;
    spanMins: number;
    level: RCIMIWPushNotificationQuietHoursLevel;
}
/**
 * [changeConversationNotificationLevel] 的接口回调
 * @param code      接口回调的状态码，0 代表成功，非 0 代表出现异常
 * @param type      会话类型
 * @param targetId  会话 ID
 * @param channelId 频道 ID，仅支持超级群使用，其他会话类型传 null 即可。
 * @param level     消息通知级别
 */
export interface OnConversationNotificationLevelChangedResult {
    code: number;
    type: RCIMIWConversationType;
    targetId: string;
    channelId: string;
    level: RCIMIWPushNotificationLevel;
}
/**
 * [loadConversationNotificationLevel] 的接口回调
 * @param code      接口回调的状态码，0 代表成功，非 0 代表出现异常
 * @param type      会话类型
 * @param targetId  会话 ID
 * @param channelId 频道 ID，仅支持超级群使用，其他会话类型传 null 即可。
 * @param level     当前会话的消息通知级别
 */
export interface OnConversationNotificationLevelLoadedResult {
    code: number;
    type: RCIMIWConversationType;
    targetId: string;
    channelId: string;
    level: RCIMIWPushNotificationLevel;
}
/**
 * [changeConversationTypeNotificationLevel] 的接口回调
 * @param code  接口回调的状态码，0 代表成功，非 0 代表出现异常
 * @param type  会话类型
 * @param level 消息通知级别
 */
export interface OnConversationTypeNotificationLevelChangedResult {
    code: number;
    type: RCIMIWConversationType;
    level: RCIMIWPushNotificationLevel;
}
/**
 * [loadConversationTypeNotificationLevel] 的接口回调
 * @param code  接口回调的状态码，0 代表成功，非 0 代表出现异常
 * @param type  会话类型
 * @param level 消息通知级别
 */
export interface OnConversationTypeNotificationLevelLoadedResult {
    code: number;
    type: RCIMIWConversationType;
    level: RCIMIWPushNotificationLevel;
}
/**
 * [changeUltraGroupDefaultNotificationLevel] 的接口回调
 * @param code     接口回调的状态码，0 代表成功，非 0 代表出现异常
 * @param targetId 会话 ID
 * @param level    消息通知级别
 */
export interface OnUltraGroupDefaultNotificationLevelChangedResult {
    code: number;
    targetId: string;
    level: RCIMIWPushNotificationLevel;
}
/**
 * [loadUltraGroupDefaultNotificationLevel] 的接口回调
 * @param code     接口回调的状态码，0 代表成功，非 0 代表出现异常
 * @param targetId 会话 ID
 * @param level    消息通知级别
 */
export interface OnUltraGroupDefaultNotificationLevelLoadedResult {
    code: number;
    targetId: string;
    level: RCIMIWPushNotificationLevel;
}
/**
 * [changeUltraGroupChannelDefaultNotificationLevel] 的接口回调
 * @param code      接口回调的状态码，0 代表成功，非 0 代表出现异常
 * @param targetId  会话 ID
 * @param channelId 频道 ID，仅支持超级群使用。
 * @param level     消息通知级别
 */
export interface OnUltraGroupChannelDefaultNotificationLevelChangedResult {
    code: number;
    targetId: string;
    channelId: string;
    level: RCIMIWPushNotificationLevel;
}
/**
 * [loadUltraGroupChannelDefaultNotificationLevel] 的接口回调
 * @param code      接口回调的状态码，0 代表成功，非 0 代表出现异常
 * @param targetId  会话 ID
 * @param channelId 频道 ID，仅支持超级群使用。
 * @param level     消息通知级别
 */
export interface OnUltraGroupChannelDefaultNotificationLevelLoadedResult {
    code: number;
    targetId: string;
    channelId: string;
    level: RCIMIWPushNotificationLevel;
}
/**
 * [changePushContentShowStatus] 的接口监听
 * @param code        接口回调的状态码，0 代表成功，非 0 代表出现异常
 * @param showContent 是否显示远程推送内容
 */
export interface OnPushContentShowStatusChangedResult {
    code: number;
    showContent: boolean;
}
/**
 * [changePushLanguage] 的接口监听
 * @param code     接口回调的状态码，0 代表成功，非 0 代表出现异常
 * @param language 推送语言
 */
export interface OnPushLanguageChangedResult {
    code: number;
    language: string;
}
/**
 * [changePushReceiveStatus] 的接口监听
 * @param code    接口回调的状态码，0 代表成功，非 0 代表出现异常
 * @param receive 是否接收
 */
export interface OnPushReceiveStatusChangedResult {
    code: number;
    receive: boolean;
}
/**
 * [loadMessageCount] 的接口监听
 * @param code      接口回调的状态码，0 代表成功，非 0 代表出现异常
 * @param type      会话类型
 * @param targetId  会话 ID
 * @param channelId 频道 ID，仅支持超级群使用，其他会话类型传 null 即可。
 * @param count     消息的数量
 */
export interface OnMessageCountLoadedResult {
    code: number;
    type: RCIMIWConversationType;
    targetId: string;
    channelId: string;
    count: number;
}
/**
 * @param code              接口回调的状态码，0 代表成功，非 0 代表出现异常
 * @param conversationTypes 会话类型集合
 * @param channelId         频道 ID，仅支持超级群使用，其他会话类型传 null 即可。
 * @param conversations     加载的会话集合
 */
export interface OnTopConversationsLoadedResult {
    code: number;
    conversationTypes: Array<RCIMIWConversationType>;
    channelId: string;
    conversations: Array<RCIMIWConversation>;
}
/**
 * [sendGroupMessageToDesignatedUsers] 的接口回调
 * 消息存入数据库的回调
 * @param message 发送的消息内容
 */
export interface OnGroupMessageToDesignatedUsersAttachedResult {
    message: RCIMIWMessage;
}
/**
 * [sendGroupMessageToDesignatedUsers] 的接口回调
 * 消息发送完成的回调
 * @param code    接口回调的状态码，0 代表成功，非 0 代表出现异常
 * @param message 发送的消息内容
 */
export interface OnGroupMessageToDesignatedUsersSentResult {
    code: number;
    message: RCIMIWMessage;
}
/**
 * [syncUltraGroupReadStatus] 的接口监听
 * @param code      接口回调的状态码，0 代表成功，非 0 代表出现异常
 * @param targetId  会话 ID
 * @param channelId 频道 ID，仅支持超级群使用，其他会话类型传 null 即可。
 * @param timestamp 已读时间
 */
export interface OnUltraGroupReadStatusSyncedResult {
    code: number;
    targetId: string;
    channelId: string;
    timestamp: number;
}
/**
 * [loadConversationsForAllChannel] 的接口监听
 * @param code          接口回调的状态码，0 代表成功，非 0 代表出现异常
 * @param type          会话类型
 * @param targetId      会话 ID
 * @param conversations 获取到的会话集合
 */
export interface OnConversationsLoadedForAllChannelResult {
    code: number;
    type: RCIMIWConversationType;
    targetId: string;
    conversations: Array<RCIMIWConversation>;
}
/**
 * [loadUltraGroupUnreadMentionedCount] 的接口监听
 * @param code     接口回调的状态码，0 代表成功，非 0 代表出现异常
 * @param targetId 会话 ID
 * @param count    未读数量
 */
export interface OnUltraGroupUnreadMentionedCountLoadedResult {
    code: number;
    targetId: string;
    count: number;
}
export interface OnUltraGroupUnreadCountLoadedResult {
    code: number;
    targetId: string;
    count: number;
}
/**
 * [modifyUltraGroupMessage] 的接口监听
 * @param code       接口回调的状态码，0 代表成功，非 0 代表出现异常
 * @param messageUId 消息的 messageUid
 */
export interface OnUltraGroupMessageModifiedResult {
    code: number;
    messageUId: string;
}
/**
 * [recallUltraGroupMessage] 的接口监听
 * @param code         接口回调的状态码，0 代表成功，非 0 代表出现异常
 * @param message      撤回的消息
 * @param deleteRemote 调用接口时传入的是否删除远端消息
 */
export interface OnUltraGroupMessageRecalledResult {
    code: number;
    message: RCIMIWMessage;
    deleteRemote: boolean;
}
/**
 * [clearUltraGroupMessages] 的接口监听
 * @param code      接口回调的状态码，0 代表成功，非 0 代表出现异常
 * @param targetId  会话 ID
 * @param channelId 频道 ID，仅支持超级群使用，其他会话类型传 null 即可。
 * @param timestamp 时间戳
 * @param policy    清除策略
 */
export interface OnUltraGroupMessagesClearedResult {
    code: number;
    targetId: string;
    channelId: string;
    timestamp: number;
    policy: RCIMIWMessageOperationPolicy;
}
/**
 * [clearUltraGroupMessagesForAllChannel] 的接口监听
 * @param code      接口回调的状态码，0 代表成功，非 0 代表出现异常
 * @param targetId  会话 ID
 * @param timestamp 时间戳
 */
export interface OnUltraGroupMessagesClearedForAllChannelResult {
    code: number;
    targetId: string;
    timestamp: number;
}
/**
 * [sendUltraGroupTypingStatus] 的接口监听
 * @param code         接口回调的状态码，0 代表成功，非 0 代表出现异常
 * @param targetId     会话 ID
 * @param channelId    频道 ID，仅支持超级群使用，其他会话类型传 null 即可。
 * @param typingStatus
 */
export interface OnUltraGroupTypingStatusSentResult {
    code: number;
    targetId: string;
    channelId: string;
    typingStatus: RCIMIWUltraGroupTypingStatus;
}
/**
 * [loadBatchRemoteUltraGroupMessages] 的接口监听
 * @param code               接口回调的状态码，0 代表成功，非 0 代表出现异常
 * @param matchedMessages    从服务获取的消息列表
 * @param notMatchedMessages 非法参数或者从服务没有拿到对应消息
 */
export interface OnBatchRemoteUltraGroupMessagesLoadedResult {
    code: number;
    matchedMessages: Array<RCIMIWMessage>;
    notMatchedMessages: Array<RCIMIWMessage>;
}
/**
 * [updateUltraGroupMessageExpansion] 的接口监听
 * @param code       接口回调的状态码，0 代表成功，非 0 代表出现异常
 * @param expansion  更新的消息扩展信息键值对
 * @param messageUId 消息的 messageUid
 */
export interface OnUltraGroupMessageExpansionUpdatedResult {
    code: number;
    expansion: {
        [propName: string]: string;
    };
    messageUId: string;
}
/**
 * [removeUltraGroupMessageExpansion] 的接口监听
 * @param code       接口回调的状态码，0 代表成功，非 0 代表出现异常
 * @param messageUId 消息的 messageUid
 * @param keys       消息扩展信息中待删除的 key 的列表
 */
export interface OnUltraGroupMessageExpansionRemovedResult {
    code: number;
    messageUId: string;
    keys: Array<string>;
}
