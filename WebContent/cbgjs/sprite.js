window
		.addEvent(
				'domready',
				function() {
					var $spriteBtn = $('sprite_btn');
					if (!$spriteBtn) {
						return;
					}
					var Store = (function() {
						var hasStorage = false;
						var storage = window.localStorage;
						if (storage) {
							try {
								var key = '__test__', oldValue = storage
										.getItem(key);
								storage.setItem(key, 1);
								storage.getItem(key);
								storage.removeItem(key);
								if (oldValue !== void 0) {
									storage.setItem(key, oldValue);
								}
								hasStorage = true;
							} catch (e) {
							}
						}
						if (!hasStorage) {
							var IELocalStorageType = new Class(
									{
										initialize : function() {
											var tagid = 'local_data_tag';
											this.dataTag = $(tagid);
											if (!this.dataTag) {
												this.dataTag = new Element(
														'div',
														{
															id : tagid,
															styles : {
																display : 'none',
																behavior : 'url(#default#userData)'
															}
														});
												$(document.body).grab(
														this.dataTag);
											}
											this.filename = 'oXMLUserData';
										},
										getItem : function(key) {
											this.dataTag.load(this.filename);
											return this.dataTag
													.getAttribute(key);
										},
										setItem : function(key, value) {
											this.dataTag.setAttribute(key,
													value);
											this.dataTag.save(this.filename);
										},
										removeItem : function(key) {
											this.dataTag.removeAttribute(key);
											this.dataTag.save(this.filename);
										}
									});
							storage = new IELocalStorageType();
						}
						return {
							hasStorage : hasStorage,
							read : function(key) {
								return storage.getItem(key);
							},
							write : function(key, val) {
								return storage.setItem(key, val);
							},
							remove : function(key) {
								return storage.removeItem(key);
							}
						};
					})();
					function htmlEncode(s) {
						var str = new String(s);
						return str.replace(/&/g, "&amp;").replace(/</g, "&lt;")
								.replace(/>/g, "&gt;").replace(/"/g, "&quot;");
					}
					var gameid = 25;
					var default_answer = '���ã���������Ϊ�������������Ĳ�����ϸ';
					var max_ques_len = 64;
					var ques = '';
					var answer = '';
					var user = '';
					function get_now_time_str() {
						var now = new Date();
						var fixZero = function(str) {
							str += '';
							return str.length <= 1 ? 0 + str : str;
						};
						return fixZero(now.getHours()) + ':'
								+ fixZero(now.getMinutes()) + ':'
								+ fixZero(now.getSeconds());
					}
					var spriteDialog = ({
						$root : $('spriteQA'),
						cookie : 'sprite_open',
						init : function(opts) {
							var ctx = this;
							ctx.opts = Object.merge({
								initAnswer : ''
							}, opts || {});
							ctx.$sprite = ctx.$root.getElement('.qa-sprite');
							ctx.$spriteContent = ctx.$sprite
									.getElement('.content');
							ctx.spriteContentHtml = '';
							if (Store.read(ctx.cookie)) {
								ctx.show();
							}
							ctx.bindUI();
							ctx.bindEvaluateUI();
							return ctx;
						},
						bindUI : function() {
							var ctx = this;
							ctx.$root.getElements('.qa-close').addEvent(
									'click', function() {
										ctx.hide();
										return false;
									});
							ctx.$root.getElements('.tab').each(
									function($tab, index) {
										$tab.addEvent('click', function() {
											ctx.switchTab(index);
											return false;
										});
									});
							ctx.$root.addEvent('switchTab', function(index) {
								setTimeout(function() {
									if (index == 1 && ctx.opts.initAnswer
											&& !ctx.spriteContentHtml) {
										ctx.addAnswer(ctx.opts.initAnswer);
									}
								}, 10);
							});
							function quikAsk(e) {
								if (window.ask) {
									ask(this.get('text'));
								}
								e.stop();
							}
							ctx.$root.addEvent('click:relay(.hot-content a)',
									quikAsk);
							ctx.$root.addEvent(
									'click:relay(.qa-sprite [name=ask])',
									quikAsk);
							ctx.$root
									.addEvent(
											'click:relay(.qa-sprite a)',
											function(e) {
												if (this.get('name') == 'ask') {
													return;
												}
												var href = this.get('href');
												var mathcersServerid = href
														.match(/[&?]serverid=([^&]+)/);
												var matchersOrdersn = href
														.match(/[&?]ordersn=([^&]+)/);
												if (mathcersServerid
														&& matchersOrdersn) {
													var matchersViewloc = href
															.match(/[&?]view_loc=([^&]+)/);
													var matchersEquipRefer = href
															.match(/[&?]equip_refer=([^&]+)/);
													var viewLoc = matchersViewloc ? matchersViewloc[1]
															: '';
													var equipRefer = matchersEquipRefer ? matchersEquipRefer[1]
															: '';
													if (equipRefer == 71) {
														viewLoc = 'fairy_recommd1';
													}
													if (!viewLoc || !equipRefer) {
														try {
															window.CBG_JS_REPORT
																	&& CBG_JS_REPORT
																			.send({
																				msg : 'SPRITE_LINK_SHOULD_HAVE_VIEWLOC_AND_EQUIPREFER',
																				info : 'qa:'
																						+ ques
																						+ ' | text:'
																						+ this
																								.get(
																										'text')
																								.trim()
																						+ ' | link:'
																						+ href
																			});
														} catch (e) {
														}
													}
												}
											});
						},
						on : function(evt, fn) {
							this.$root.addEvent(evt, fn);
							return this;
						},
						off : function(evt, fn) {
							this.$root.removeEvent(evt, fn);
							return this;
						},
						one : function(evt, fn) {
							var ctx = this;
							var newFn = function() {
								ctx.off(evt, newFn);
								return fn.apply(this, arguments);
							};
							return ctx.on(evt, newFn);
						},
						fire : function() {
							this.$root.fireEvent.apply(this.$root, arguments);
							return this;
						},
						switchTab : function(index) {
							var ctx = this;
							var $tabs = ctx.$root.getElements('.tab');
							$tabs.removeClass('on')[index].addClass('on');
							var $contents = ctx.$root
									.getElements('.js-content');
							if ($contents[index]) {
								$contents.setStyle('display', 'none')[index]
										.setStyle('display', 'block');
							}
							ctx.$root.fireEvent('switchTab', index);
						},
						toHotTab : function() {
							this.switchTab(0);
						},
						toAskTab : function() {
							this.switchTab(1);
						},
						updateHotModule : function(options) {
							var opts = Object.merge({
								question : ''
							}, options || {});
							var $root = this.$root;
							if (opts.question) {
								$root.getElements('.hot-questions').set(
										'html',
										window.render(
												'sprite-hot-question-template',
												opts.question));
							}
						},
						addQuestion : function(html) {
							var url = ResUrl + '/images/no_login_user.gif';
							var $pesonalIcon = $$('.headerInfo .avatar')[0];
							if ($pesonalIcon) {
								url = $pesonalIcon.get('src');
								if (url.indexOf('no_login_user') >= 0) {
									url = ResUrl + '/images/sprite/default.png';
								}
							}
							this.addToSprintContent(true, {
								className : 'qa-q',
								url : url,
								html : html
							});
						},
						addAnswer : function(html) {
							this.addToSprintContent(false, {
								className : 'qa-a',
								url : ResUrl + '/images/sprite/kefu.png',
								html : html
							});
						},
						addToSprintContent : function(isQuestion, opts) {
							var ctx = this;
							opts = Object.merge({
								className : '',
								url : '',
								html : '',
								time : get_now_time_str()
							}, opts || {});
							var title = '<dt class="iconWrap"><img class="icon" src="'
									+ opts.url + '" /><i class="zz"></i></dt>';
							var result = '<dl class="'
									+ opts.className
									+ '">\
        '
									+ (isQuestion ? '' : title)
									+ '\
        <dd>\
          <div class="time">'
									+ opts.time
									+ '</div>\
          <div class="message">\
            <i class="tl"></i><i class="tr"></i><i class="bl"></i><i class="br"></i>\
            <div class="text">'
									+ opts.html
									+ '</div>\
          </div>\
        </dd>\
        '
									+ (isQuestion ? title : '')
									+ '\
      </dl>';
							ctx.spriteContentHtml += result;
							ctx.$spriteContent.set('html',
									ctx.spriteContentHtml);
							ctx.fixScroll();
						},
						_scrollTimer : null,
						fixScroll : function() {
							var ctx = this;
							clearTimeout(ctx._scrollTimer);
							ctx._scrollTimer = setTimeout(function() {
								var $main = ctx.$sprite.getParent();
								var $last = ctx.$spriteContent.getLast('.qa-q')
										|| ctx.$spriteContent.getLast();
								$main.scrollTop = $last.getOffsets().y
										- $main.getOffsets().y - 5;
							});
						},
						show : function() {
							$spriteBtn.addClass('on');
							this.$root.setStyle('display', 'block');
							Store.write(this.cookie, 1);
							this.fire('show');
						},
						hide : function() {
							$spriteBtn.removeClass('on');
							this.$root.setStyle('display', 'none');
							Store.remove(this.cookie);
							this.fire('hide');
						},
						toggle : function() {
							var ctx = this;
							if (ctx.$root.getStyle('display') != 'none') {
								ctx.hide();
							} else {
								ctx.show();
							}
						},
						bindEvaluateUI : function() {
							var ctx = this;
							var $evaluate = ctx.$evaluate = ctx.$root
									.getElement('.spritemm');
							$evaluate.addEvent('click:relay(.js_resolve)',
									function(e) {
										ctx.showGoodEvaluate();
										e.stop();
									}).addEvent('click:relay(.js_reject)',
									function(e) {
										ctx.showBadEvaluate();
										e.stop();
									});
						},
						_postEvaluateResult : function(value) {
							var request = new Request({
								url : '/cgi-bin/sprite.py',
								onSuccess : function(text, html) {
									var res;
									try {
										res = eval('(' + text + ')');
										if (res['status'] != 1)
											alert(res['msg']);
									} catch (e) {
										alert(e);
									}
								}
							});
							request.post({
								question : ques,
								gameid : gameid,
								act : 'eval',
								evaluate : value,
								answer : answer,
								remarks : user
							});
						},
						showGoodEvaluate : function() {
							var $evaluate = this.$evaluate;
							var css = {
								display : 'block'
							};
							$evaluate.getElements('.js_good').setStyles(css);
							css.display = 'none';
							$evaluate.getElements('.js_init,.js_bad')
									.setStyles(css);
							this._postEvaluateResult(1);
						},
						showBadEvaluate : function() {
							var $evaluate = this.$evaluate;
							var css = {
								display : 'block'
							};
							$evaluate.getElements('.js_bad').setStyles(css);
							css.display = 'none';
							$evaluate.getElements('.js_init,.js_good')
									.setStyles(css);
							this._postEvaluateResult(0);
						},
						showEvaluate : function() {
							var $evaluate = this.$evaluate;
							var css = {
								display : 'block'
							};
							$evaluate.setStyles(css);
							$evaluate.getElements('.js_init').setStyles(css);
							css.display = 'none';
							$evaluate.getElements('.js_good,.js_bad')
									.setStyles(css);
						},
						hideEvaluate : function() {
							var $evaluate = this.$evaluate;
							$evaluate.setStyle('display', 'none');
						}
					}).init({
						initAnswer : '�װ��ģ�������ʲô�����ˣ�����С����<br/>���ʰɡ�'
					});
					$('sprite_link').addEvent('click', function() {
						spriteDialog.toggle();
						return false;
					});
					if (window.sprite_url) {
						$('js_more_sprite_link').href = sprite_url;
					} else {
						$('js_more_sprite_link').setStyle('display', 'none');
					}
					if (window.sprite_hotq) {
						var data = {
							updateTime : '',
							banner : {},
							list : []
						};
						var spriteList = sprite_hotq.split('||');
						data.updateTime = (spriteList.shift() || '').trim();
						if (!/^\d+-\d+-\d+/.test(data.updateTime)) {
							data.updateTime = '';
						}
						var images = (spriteList.shift() || '').split('@');
						var isImage = images[0]
								&& /^(https?:)?\/\//.test(images[0].trim());
						var isImageLink = images[1]
								&& /^(https?:)?\/\//.test(images[1].trim());
						data.banner = {
							src : isImage ? images[0] : '',
							text : htmlEncode(isImageLink ? ''
									: (images[1] || '')),
							href : isImageLink ? (images[1] || '') : ''
						};
						spriteList.each(function(str) {
							if (!str.trim()) {
								return;
							}
							var list = str.split('|');
							var title = htmlEncode(list.shift() || '');
							var item = {
								title : title,
								questions : []
							};
							list.each(function(qa) {
								qa = qa.trim();
								if (qa) {
									item.questions.push(htmlEncode(qa));
								}
							});
							if (item.questions.length > 0) {
								data.list.push(item);
							}
						});
						spriteDialog.updateHotModule({
							question : data
						});
						var cookie_update_time = 'sprite_update_time';
						if (!$spriteBtn.hasClass('on')) {
							var isUpdated = !Store.read(cookie_update_time)
									|| data.updateTime > Store
											.read(cookie_update_time);
							if (isUpdated) {
								var $btn = $('sprite_link');
								$btn.grab(new Element('span.dot'), 'bottom');
								spriteDialog.one('show', function() {
									$btn.getElement('.dot').destroy();
									Store.write(cookie_update_time,
											data.updateTime);
								});
							}
						} else if (data.updateTime) {
							Store.write(cookie_update_time, data.updateTime);
						}
					} else {
						spriteDialog.updateHotModule({
							question : {
								banner : {},
								list : []
							}
						});
					}
					$('type_box').addEvents({
						focus : function() {
							initAutoComplete();
							if (this.value == this.defaultValue) {
								this.set('value', '');
								this.setStyle('color', "#000000");
							}
						},
						blur : function() {
							if (!this.value.trim()) {
								this.set('value', this.defaultValue);
								this.setStyle('color', '#999999');
							}
						},
						keyup : function(e) {
							e = e.event;
							var key = e.keyCode;
							if (key == 13) {
								ask();
								ask_tips && ask_tips.hide();
							}
						}
					});
					var ask_tips;
					function initAutoComplete() {
						if (ask_tips) {
							return
						}
						ask_tips = new AutoComplete(
								$('type_box'),
								{
									startPoint : 1,
									promptNum : 20,
									selectAtEnter : false,
									handle_func : function(keyword) {
										var __this = this;
										var url = 'http://tip.chatbot.nie.163.com/cgi-bin/good_evaluate_question_tip.py'
										new Request.JSONP({
											url : url,
											callbackKey : 'callback',
											data : {
												game : 1,
												prefix : keyword,
												max_num : 10
											},
											onComplete : function(result) {
												if (result.success) {
													var data = result.data
															.map(function(v) {
																return '��' + v
															});
													__this.set_result(data);
												}
											}
										}).send();
									},
									onClick : function() {
										ask();
									}
								});
					}
					var all_answer = '';
					function add_chat_question(question, is_question,
							original_size) {
						if (is_question) {
							spriteDialog.addQuestion(question);
						} else {
							spriteDialog.addAnswer(question);
						}
					}
					var head = document.head
							|| document.getElementsByTagName('head')[0]
							|| document.documentHead;
					function getScript(url, callback) {
						var script = document.createElement('script');
						script.type = 'text/javascript';
						script.async = 'async';
						script.charset = 'gbk';
						script.src = url;
						script.onload = script.onreadystatechange = function(_,
								isAbort) {
							if (isAbort
									|| !script.readyState
									|| /loaded|complete/
											.test(script.readyState)) {
								script.onload = script.onreadystatechange = null;
								if (head && script.parentNode) {
									script.parentNode.removeChild(script);
								}
								script = null;
								if (!isAbort) {
									callback(200, 'success');
								}
							}
						};
						head.insertBefore(script, head.firstChild);
					}
					function ask(question, eval, nolog) {
						if (question === undefined) {
							question = $('type_box').get('value').trim();
						}
						if (eval === undefined) {
							eval = 1;
						}
						ques = (question || '').trim();
						var $type_box = $('type_box');
						$type_box.set('value', '');
						$type_box.setStyle('color', 'black');
						if (ques == '' || ques == $type_box.defaultValue) {
							alert('���ⲻ��Ϊ�գ�');
						} else if (ques.length > max_ques_len) {
							alert('����̫����');
						} else {
							spriteDialog.hideEvaluate();
							if (ques == '��������') {
								return spriteDialog.toHotTab();
							}
							spriteDialog.toAskTab();
							add_chat_question(ques, true);
							if (user == '') {
								var urs = Cookie.read('login_user_urs') || '';
								var roleid = Cookie.read('login_user_roleid')
										|| '';
								var level = Cookie.read('login_user_level')
										|| '';
								var server_name = Cookie.read('cur_servername')
										|| '';
								server_name = decodeURIComponent(server_name);
								user += 'urs=' + urs + ',hostnum='
										+ server_name + ',id=' + roleid
										+ ',level=' + level;
							}
							var ask_url = 'http://cbg.chatbot.nie.163.com/cgi-bin/bot.cgi?output=js&user='
									+ user + '&ques=' + ques;
							if (nolog) {
								ask_url += '&nolog=1';
							}
							$('type_box').disabled = true;
							getScript(
									ask_url,
									function(response, status) {
										$('type_box').disabled = false;
										if (status != 'success') {
											alert('�������');
											return;
										}
										if (ROBOT_ANSWER.substring(0, 2) != 'A:') {
											alert('�������');
											return;
										}
										answer = ROBOT_ANSWER.substring(2);
										add_chat_question(answer, false);
										if (answer.indexOf(default_answer) != 0
												&& eval) {
											spriteDialog.showEvaluate();
										} else {
											spriteDialog.hideEvaluate();
										}
									});
						}
					}
					window.ask = ask;
				});