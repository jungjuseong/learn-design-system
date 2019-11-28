declare type MYSVGElement = SVGSVGElement & {
	animationsPaused: () => boolean;
};
declare type MYAniTransEL = SVGElement & {
	beginElement: () => void;
	beginElementAt: (sec: number) => void;
	endElement: () => void;
	endElementAt: (sec: number) => void;
};

declare const _build_timestamp_: string;
declare const h_ls_portfolio_t: boolean;

declare const cfg_debug: boolean;
declare const cfg_dist: boolean;
declare const _kor_lib_: string;
declare const _project_: string;

declare const P3_gram1_quiz_t: boolean;
declare const P3_gram1_quiz_s: boolean;
declare const P3_gram1_act_t: boolean;
declare const P3_gram1_act_s: boolean;
declare const P3_gram1_ex_t: boolean;
declare const P3_gram1_ex_s: boolean;
declare const P3_rw_quiz_t: boolean;
declare const P3_rw_quiz_s: boolean;
declare const P3_rw_exp_t: boolean;
declare const P3_rw_exp_s: boolean;
declare const P3_rw_ex_t: boolean;
declare const P3_rw_ex_s: boolean;
declare const P3_gram1_sum_t: boolean;
declare const P3_gram1_sum_s: boolean;
declare const P3_rw_act_t: boolean;
declare const P3_rw_act_s: boolean;
declare const P3_base_template_t: boolean;
declare const P3_base_template_s: boolean;
declare const P3_test_t: boolean;
declare const P3_test_s: boolean;
declare const P3_test_exp_t: boolean;
declare const P3_test_exp_s: boolean;
declare const P3_finish_review_t: boolean;
declare const P3_finish_review_s: boolean;
declare const P3_finish_under_t: boolean;
declare const P3_finish_under_s: boolean;
declare const P3_finish_make_t: boolean;
declare const P3_finish_make_s: boolean;
declare const P3_finish_think_t: boolean;
declare const P3_finish_think_s: boolean;
declare const P3_finish_solve_t: boolean;
declare const P3_finish_solve_s: boolean;
declare const P3_test_make_t: boolean;
declare const P3_test_make_s: boolean;
declare const P3_rw_sum_t: boolean;
declare const P3_rw_sum_s: boolean;
declare const P3_gram1_exp_t: boolean;
declare const P3_gram1_exp_s: boolean;

//중급1 초급 다시보기
declare const P3_S_voca_ex_t: boolean;
declare const P3_S_voca_ex_s: boolean;
declare const P3_S_voca_quiz_t: boolean;
declare const P3_S_voca_quiz_s: boolean;
declare const P3_S_voca_act_t: boolean;
declare const P3_S_voca_act_s: boolean;
declare const P3_S_gram_ex_t: boolean;
declare const P3_S_gram_ex_s: boolean;
declare const P3_S_gram_quiz_t: boolean;
declare const P3_S_gram_quiz_s: boolean;
declare const P3_S_gram_act_t: boolean;
declare const P3_S_gram_act_s: boolean;
declare const P3_S_speak_act_t: boolean;
declare const P3_S_speak_act_s: boolean;


//중급2
declare const P4_gram1_quiz_t: boolean;
declare const P4_gram1_quiz_s: boolean;
declare const P4_gram1_act_t: boolean;
declare const P4_gram1_act_s: boolean;
declare const P4_gram1_ex_t: boolean;
declare const P4_gram1_ex_s: boolean;
declare const P4_rw_quiz_t: boolean;
declare const P4_rw_quiz_s: boolean;
declare const P4_rw_exp_t: boolean;
declare const P4_rw_exp_s: boolean;
declare const P4_rw_ex_t: boolean;
declare const P4_rw_ex_s: boolean;
declare const P4_S_speak_act_t: boolean;
declare const P4_S_speak_act_s: boolean;
declare const P4_gram1_sum_t: boolean;
declare const P4_gram1_sum_s: boolean;
declare const P4_rw_act_t: boolean;
declare const P4_rw_act_s: boolean;
declare const P4_base_template_t: boolean;
declare const P4_base_template_s: boolean;
declare const P4_test_t: boolean;
declare const P4_test_s: boolean;
declare const P4_test_exp_t: boolean;
declare const P4_test_exp_s: boolean;
declare const P4_finish_review_t: boolean;
declare const P4_finish_review_s: boolean;
declare const P4_finish_under_t: boolean;
declare const P4_finish_under_s: boolean;
declare const P4_finish_make_t: boolean;
declare const P4_finish_make_s: boolean;
declare const P4_finish_think_t: boolean;
declare const P4_finish_think_s: boolean;
declare const P4_finish_solve_t: boolean;
declare const P4_finish_solve_s: boolean;
declare const P4_test_make_t: boolean;
declare const P4_test_make_s: boolean;
declare const P4_rw_sum_t: boolean;
declare const P4_rw_sum_s: boolean;
declare const P4_gram1_exp_t: boolean;
declare const P4_gram1_exp_s: boolean;
declare const P3_R1_gram_ex_t: boolean;
declare const P3_R1_gram_ex_s: boolean;
declare const P3_R1_gram_quiz_t: boolean;
declare const P3_R1_gram_quiz_s: boolean;
declare const P3_R1_gram_act_t: boolean;
declare const P3_R1_gram_act_s: boolean;
declare const P3_R1_rw_quiz_t: boolean;
declare const P3_R1_rw_quiz_s: boolean;
declare const P3_R1_rw_act_t: boolean;
declare const P3_R1_rw_act_s: boolean;
declare const P3_R1_finish_review_t: boolean;
declare const P3_R1_finish_review_s: boolean;
declare const P3_R1_finish_solve_t: boolean;
declare const P3_R1_finish_solve_s: boolean;
declare const P3_R1_finish_think_t: boolean;
declare const P3_R1_finish_think_s: boolean;
declare const P3_R1_rw_ex_t: boolean;
declare const P3_R1_rw_ex_s: boolean;
declare const P3_R1_video_t: boolean;
declare const P3_R1_video_s: boolean;

//중급2다시보기 기존과목
declare const P4_S_gram_quiz_t: boolean;
declare const P4_S_gram_quiz_s: boolean;
declare const P4_S_gram_act_t: boolean;
declare const P4_S_gram_act_s: boolean;
declare const P4_S_rw_quiz_t: boolean;
declare const P4_S_rw_quiz_s: boolean;
declare const P4_S_rw_act_t: boolean;
declare const P4_S_rw_act_s: boolean;
declare const P4_S_ls_quiz_t: boolean;
declare const P4_S_ls_quiz_s: boolean;
declare const P4_S_ls_act_t: boolean;
declare const P4_S_ls_act_s: boolean;
//중급2다시보기 신규과목
declare const P4_S_gram_ex_t: boolean;
declare const P4_S_gram_ex_s: boolean;
declare const P4_S_rw_ex_t: boolean;
declare const P4_S_rw_ex_s: boolean;
declare const P4_S_ls_ex_t: boolean;
declare const P4_S_ls_ex_s: boolean;