import * as StrUtil from "../utils/StrUtil";
import * as felsocket from "../utils/felsocket";

export interface IMain {
	start: () => void;
	receive: (data: ISocketData) => void;
	uploaded: (url: string) => void;
	notify: (type: string) => void;
	notifyRecorded: (url: string) => void;
	notifyVideoRecord: (url: string) => void;
	multi_uploaded: (urls: string[]) => void;
}

export class App {
	private static _isMobile = false;
	private static _tempBnd: HTMLDivElement;
	private static _tempEl: HTMLDivElement;
	private static _data: any;
	static get data() {
		return App._data;
	}

	static get isMobile() {
		return App._isMobile;
	}
	static get tempEl() {
		return App._tempEl;
	}

	static pub_init() {
		// JS.setProp(Browser.window, "felsock_o", FELSocket);
		// JS.setProp(Browser.window, "app_o", App);
		const a = navigator.userAgent;
		const r1 = /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i;
		const r2 = /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i;
		const r3 = /android/i;
		App._isMobile = r1.test(a) || r2.test(a) || r3.test(a);

		App._tempBnd = document.createElement("div");
		App._tempBnd.style.display = "none";
		App._tempEl = document.createElement("div");
		App._tempBnd.appendChild(App._tempEl);

		if (document.body === null) {
			document.addEventListener("DOMContentLoaded", e => {
				document.body.appendChild(App._tempBnd);
			});
		} else {
			document.body.appendChild(App._tempBnd);
		}
	}

	private static _students: Array<IStudent> = [];
	private static _students_inited: string[] = [];
	private static _students_sended: boolean = false;
	static get students() {
		felsocket.getStudents(function (students: Array<any>, isOk: boolean) {
			if (isOk && App._students_sended == false) {
				App._students_sended = true;
				App._students.map((studen_: IStudent) => {
					let student =
						App.students[
						students.findIndex(arr => {
							return arr.id == studen_.id;
						})
						];
					if (students) {
						App.settingStudent(students);
					}
				});
			}
		});

		return App._students;
	}

	static isTeacher = false;

	private static _student: IStudent | null = null;
	// 선생 에서 사용
	static studentInfoToTeacher(id: string, callback: (v: IStudent) => void) {
		felsocket.getStudents(function (students: Array<any>, isOk: boolean) {
			if (isOk) {
				let student =
					App.students[
					students.findIndex(arr => {
						return arr.id == id;
					})
					];
				if (student && student.thumb.indexOf("static/") != -1) {
					if (student.thumb.endsWith("w.jpg")) {
						student.thumb = "/content/kor_lib/images/default_member_w.jpg";
					} else {
						student.thumb = "/content/kor_lib/images/default_member_m.jpg";
					}
				}
				if (students) {
					App.settingStudent(students);
				}
			}
		});
	}

	static _toStringTimestamp = (dateObj: Date) => {
		let retVal;
		const yyyy = dateObj.getFullYear();
		let mm = dateObj.getMonth() + 1 + "";
		if (parseInt(mm) < 10) {
			mm = "0" + mm;
		}
		let dd = dateObj.getDate() + "";
		if (parseInt(dd) < 10) {
			dd = "0" + dd;
		}
		retVal =
			yyyy + "-" + mm + "-" + dd + " " + dateObj.toTimeString().substr(0, 8);
		return retVal;
	};

	static get student() {
		return App._student;
	}

	private static _lang = "ko";
	static get lang() {
		return App._lang;
	}
	private static _isDvlp = false;
	static get isDvlp() {
		return App._isDvlp;
	}

	private static _data_url = "../data/";
	static get data_url(): String {
		return App._data_url;
	}

	private static _lesson = "";
	static get lesson() {
		return App._lesson;
	}

	private static _book = "";
	static get book() {
		return App._book;
	}

	private static _nextBook = false;
	static get nextBook() {
		return App._nextBook;
	}

	private static _prevBook = false;
	static get prevBook() {
		return App._prevBook;
	}
	static thumbDisplayMode: "1" | "2" | "null" = "null";
	private static _start_idx = -1;
	static isStarted = false;

	static pub_load(
		students: IStudent[] | null,
		student: IStudent | null,
		book: string,
		lesson: string,
		nextBook: boolean,
		prevBook: boolean,
		isTeacher: boolean
	) {
		App._lesson = lesson;
		App._book = book;
		// App._initAudio();
		App._nextBook = nextBook;
		App._prevBook = prevBook;

		App._students = students ? students : [];
		App._student = student;
		App.isTeacher = isTeacher;
	}
	static settingStudent = (students: any[], type?: string) => {
		type ? console.log(type) : "";
		students ? console.log(students) : "";
		for (let i = 0, len = students.length; i < len; i++) {
			// students[i].defaultThumbnail이 실사사진이 아닌 default이미지를 전달한 경우
			if (App.isDvlp) {
				App.students[i] = students[i];
				App.students[i].displayMode = "1"; // '1':실사모드 | '2':아바타모드
			} else {
				App.students[i] = {
					id: students[i].id,
					name: students[i].name,
					thumb: students[i].defaultThumbnail || students[i].thumb,
					avatar: students[i].profileThumbnail || students[i].avatar,
					nickname: students[i].nickName,
					displayMode: students[i].displayMode, // '1':실사모드 | '2':아바타모드
					inited: true
				};
			}
			(i => {
				setTimeout(() => {
					if (App.students[i].thumb.indexOf("static") != -1) {
						if (App.students[i].thumb.indexOf("member_w") != -1) {
							App.students[i].thumb =
								"/content/kor_lib/images/default_member_w.jpg";
						} else {
							App.students[i].thumb =
								"/content/kor_lib/images/default_member_m.jpg";
						}
					}
					App.students[i].avatar = App.students[i].avatar.substring(
						App.students[i].avatar.indexOf("/attach")
					);
					App.students[i].thumb = App.students[i].thumb.substring(
						App.students[i].thumb.indexOf("/attach")
					);
					setTimeout(() => {
						felsocket.sendPAD($SocketType.GET_NICKNAME, {
							id: App.students[i].id,
							nickname: App.students[i].nickname,
							thumb: App.students[i].thumb,
							avatar: App.students[i].avatar,
							displayMode: App.students[i].displayMode
						});
						App.thumbDisplayMode = App.students[i].displayMode as
							| "1"
							| "2"
							| "null";
					}, 10);
				}, 1000);
			})(i);
			App._students_inited.push(students[i].id);
		}
	};
	static pub_reloadStudents(callBack: () => void) {
		let checkConnect = false;
		felsocket.getStudents(function (students: Array<any>, isOk: boolean) {
			if (checkConnect == false) {
				checkConnect = true;
				while (App._students.length > 0) {
					App._students.pop();
				}
				while (App._students_inited.length > 0) {
					App._students_inited.pop();
				}
				App.settingStudent(students);
				callBack();
			}
		});
		setTimeout(() => {
			if (checkConnect == false && App.students.length == 0) {
				App.settingStudent(App.students);
			}
		}, 1500);
	}

	static pub_parseStyle(str: string) {
		App._tempEl.style.cssText = str;
		return App._tempEl.style;
	}
	private static _common_audio: HTMLAudioElement;
	private static _ding_audio: HTMLAudioElement | null;
	private static _dingend_audio: HTMLAudioElement | null;
	private static _btn_audio: HTMLAudioElement | null;
	private static _correct_audio: HTMLAudioElement | null;
	private static _wrong_audio: HTMLAudioElement | null;
	private static _topad_audio: HTMLAudioElement | null;
	private static _goodjob_audio: HTMLAudioElement | null;

	private static _btn_back_audio: HTMLAudioElement | null;
	private static _btn_page_audio: HTMLAudioElement | null;
	private static _card_audio: HTMLAudioElement | null;
	private static _popup_audio: HTMLAudioElement | null;

	private static _flips_audio: HTMLAudioElement | null;
	private static _clock_audio: HTMLAudioElement | null;

	private static _write_audio: HTMLAudioElement | null;

	private static _like_bubble_audio: HTMLAudioElement | null;

	static pub_initAudio() {
		App._common_audio = document.getElementById(
			"common_audio"
		) as HTMLAudioElement;

		App._ding_audio = document.getElementById(
			"ding_audio"
		) as HTMLAudioElement | null;
		App._dingend_audio = document.getElementById(
			"dingend_audio"
		) as HTMLAudioElement | null;
		App._btn_audio = document.getElementById(
			"btn_audio"
		) as HTMLAudioElement | null;

		App._correct_audio = document.getElementById(
			"correct_audio"
		) as HTMLAudioElement | null;
		App._wrong_audio = document.getElementById(
			"wrong_audio"
		) as HTMLAudioElement | null;
		App._topad_audio = document.getElementById(
			"topad_audio"
		) as HTMLAudioElement | null;

		App._goodjob_audio = document.getElementById(
			"goodjob_audio"
		) as HTMLAudioElement | null;

		App._btn_back_audio = document.getElementById(
			"btn_back_audio"
		) as HTMLAudioElement | null;
		App._btn_page_audio = document.getElementById(
			"btn_page_audio"
		) as HTMLAudioElement | null;
		App._card_audio = document.getElementById(
			"card_audio"
		) as HTMLAudioElement | null;
		App._popup_audio = document.getElementById(
			"popup_audio"
		) as HTMLAudioElement | null;

		App._flips_audio = document.getElementById(
			"card_flips"
		) as HTMLAudioElement | null;
		App._clock_audio = document.getElementById(
			"clock_audio"
		) as HTMLAudioElement | null;

		App._write_audio = document.getElementById(
			"write_audio"
		) as HTMLAudioElement | null;

		App._like_bubble_audio = document.getElementById(
			"like_bubble"
		) as HTMLAudioElement | null;
	}
	static pub_playLikeBubble() {
		if (App._like_bubble_audio) {
			App._like_bubble_audio.currentTime = 0;
			App._like_bubble_audio.play();
		}
	}

	static pub_playWrite() {
		if (App._write_audio) {
			App._write_audio.currentTime = 0;
			App._write_audio.play();
		}
	}
	static pub_playClock() {
		if (App._clock_audio) {
			App._clock_audio.currentTime = 4.5;
			App._clock_audio.play();
		}
	}

	static pub_playFlips() {
		if (App._flips_audio) {
			App._flips_audio.currentTime = 0;
			App._flips_audio.play();
		}
	}

	static pub_playPopup() {
		if (App._popup_audio) {
			App._popup_audio.currentTime = 0;
			App._popup_audio.play();
		}
	}
	static pub_playCard() {
		if (App._card_audio) {
			App._card_audio.currentTime = 0;
			App._card_audio.play();
		}
	}

	static pub_playBtnPage() {
		if (App._btn_page_audio) {
			App._btn_page_audio.currentTime = 0;
			App._btn_page_audio.play();
		}
	}
	static pub_playBtnBack() {
		if (App._btn_back_audio) {
			App._btn_back_audio.currentTime = 0.5;
			App._btn_back_audio.play();
		}
	}

	static pub_playGoodjob() {
		if (App._goodjob_audio) {
			App._goodjob_audio.currentTime = 0;
			App._goodjob_audio.play();
		}
	}
	static pub_playDing() {
		if (App._ding_audio) {
			App._ding_audio.currentTime = 0;
			App._ding_audio.play();
		}
	}
	static pub_playDingend() {
		if (App._dingend_audio) {
			App._dingend_audio.currentTime = 0;
			App._dingend_audio.play();
		}
	}
	static pub_playToPad() {
		if (App._topad_audio) {
			App._topad_audio.currentTime = 0;
			App._topad_audio.play();
		}
	}

	static pub_playBtnTab() {
		if (App._btn_audio) {
			App._btn_audio.currentTime = 0;
			App._btn_audio.play();
		}
	}
	static pub_playCorrect() {
		if (App._correct_audio) {
			App._correct_audio.currentTime = 0;
			App._correct_audio.play();
		}
	}
	static pub_playWrong() {
		if (App._wrong_audio) {
			App._wrong_audio.currentTime = 0;
			App._wrong_audio.play();
		}
	}

	static pub_playStudentBubble() {
		const audio = document.getElementById(
			"student_bubble"
		) as HTMLAudioElement | null;
		if (audio) {
			audio.currentTime = 0;
			if (audio.paused) audio.play();
		}
	}

	static pub_stop(callback?: () => void) {
		if (App._common_audio.onended != null) {
			App._common_audio.onended.call(App._common_audio);
		}
		App._common_audio.oncanplaythrough = null;
		if (!isNaN(App._common_audio.duration) && !App._common_audio.paused) {
			App._common_audio.pause();
		}
		callback ? callback() : "";
	}

	static pub_play(url: string, callBack: (isEnded: boolean) => void) {
		App.pub_stop();

		url = StrUtil.nteString(url, "");
		var curSrc = StrUtil.nteString(App._common_audio.getAttribute("src"), "");

		if (url === "" && curSrc === "") {
			if (callBack != null) callBack(true);
			return;
		}

		if (url !== "" && curSrc !== url) {
			App._common_audio.src = url;
		}

		App._common_audio.onended = e => {
			if (callBack !== null) callBack(e ? true : false);
			App._common_audio.onended = null;
			App._common_audio.onerror = null;
		};
		App._common_audio.onerror = e => {
			if (callBack !== null) callBack(true);
			App._common_audio.onended = null;
			App._common_audio.onerror = null;
		};

		if (isNaN(App._common_audio.duration)) {
			App._common_audio.oncanplaythrough = e => {
				if (App._common_audio.currentTime !== 0) {
					App._common_audio.currentTime = 0;
				}
				App._common_audio.play();
				App._common_audio.oncanplaythrough = null;
			};
			App._common_audio.load();
		} else {
			if (App._common_audio.currentTime !== 0) {
				App._common_audio.currentTime = 0;
			}

			App._common_audio.oncanplaythrough = null;
			App._common_audio.play();
		}
	}
	static isDataChecked: boolean = false;
	static isDataCheckUnedfined(
		data: object,
		key: string,
		idx: number,
		maxidx: number,
		haskey: string,
		pagekey?: string
	) {
		if (App.isDataChecked == false) {
			var data_ = pagekey ? data[pagekey] : data;
			if (
				data_ &&
				data_[key + idx] &&
				data_[key + idx][haskey] &&
				data_[key + idx][haskey].length != 0
			) {
				// 해당 키가 존재하므로 통과
			} else {
				// 해당 키가 없으므로 삭제
				try {
					delete data_[key + idx];
				} catch (e) {
					console.log("삭제처리 에러");
				}
			}
			idx === maxidx ? (App.isDataChecked = true) : "";
		}
	}

	static findSpeaker(data: any) {
		for (let key in data) {
			if (key == "speaker_new") {
				switch (data[key]) {
					case "민호":
						data[key] = 0;
						break;
					case "유라":
						data[key] = 1;
						break;
					case "에릭":
						data[key] = 2;
						break;
					case "승윤":
						data[key] = 3;
						break;
					case "안나":
						data[key] = 4;
						break;
					case "지은":
						data[key] = 5;
						break;
					case "엑스트라1":
						data[key] = 6;
						break;
					case "엑스트라2":
						data[key] = 7;
						break;
					case "엑스트라3":
						data[key] = 8;
						break;
					case "서준":
						data[key] = 9;
						break;
					case "진우":
						data[key] = 10;
						break;
				}
			}
			if (typeof data[key] == "object") {
				this.findSpeaker(data[key]);
			}
		}
	}

	static pub_set(data: any, isDvlp: boolean, lang: string) {
		// 화자 관련 변경
		App.findSpeaker(data);
		App._data = data;
		App._isDvlp = isDvlp;
		App._lang = lang;
		felsocket.set(isDvlp);
	}

	static pub_addInitedStudent(student: IStudent) {
		let bAdd = true;
		App._students_sended = false;

		for (let i = 0, len = App._students_inited.length; i < len; i++) {
			const chk = App._students_inited[i];
			if (chk === student.id) {
				bAdd = false;
			}
		}
		if (bAdd) {
			App._students_inited.push(student.id);
		}

		const ret =
			App._start_idx > 0 &&
			App._students.length > 0 &&
			App._students_inited.length >= App._students.length;
		if (ret) {
			window.clearTimeout(App._start_idx);
			App._start_idx = -1;
		}

		App.student;

		return ret;
	}

	static pub_start(callBack: () => void) {
		if (
			App._students.length === 0 ||
			App._students_inited.length >= App._students.length
		) {
			App._students_sended = false;

			App.students && App.students[0].displayMode
				? (App.thumbDisplayMode = App.students[0].displayMode as "1" | "2")
				: "";

			callBack();
		} else {
			App._students_sended = false;
			App._start_idx = window.setTimeout(callBack, 2000);
		}
	}

	static pub_clear() {
		while (App._students.length > 0) {
			App._students.pop();
		}
		while (App._students_inited.length > 0) {
			App._students_inited.pop();
		}
	}
}
