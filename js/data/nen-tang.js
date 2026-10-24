/* Dữ liệu 10 bài nền tảng. Mỗi bài: id, title, lead, quotes, body, example, wrong, right, check, explain. */
const F = [
  {id:1, title:"Cách đọc 36 kế", lead:"Tên kế chỉ là cái nhãn để nhớ. Nguyên lý nằm ở lời giải, và chính tác giả đã cảnh báo đừng áp dụng máy móc.",
   quotes:[
     {zh:"六六三十六，数中有术，术中有数。阴阳燮理，机在其中。机不可设，设则不中。", hv:"Lục lục tam thập lục, số trung hữu thuật, thuật trung hữu số. Âm dương tiếp lý, cơ tại kỳ trung. Cơ bất khả thiết, thiết tắc bất trúng.", vi:"Sáu sáu ba mươi sáu, trong con số có phép thuật, trong phép thuật có con số. Âm dương điều hòa lẫn nhau, thời cơ nằm ở trong đó. Thời cơ không thể sắp đặt sẵn; sắp đặt sẵn thì không trúng.", src:"Lời mở đầu của Tam thập lục kế"},
     {zh:"备周则意怠，常见则不疑。", hv:"Bị chu tắc ý đãi, thường kiến tắc bất nghi.", vi:"Phòng bị chu toàn thì ý chí lơi lỏng; điều thường thấy thì không còn nghi ngờ.", src:"Giải ngữ của kế Man thiên quá hải"}
   ],
   body:[
     "36 kế không phải binh thư cổ đại như nhiều người nghĩ. Cụm từ “ba mươi sáu kế” xuất hiện sớm nhất trong Nam Tề thư, qua câu nói về tướng Đàn Đạo Tế: “ba mươi sáu sách của Đàn công, chạy là thượng sách”. Văn bản hoàn chỉnh do một người khuyết danh soạn, có lẽ vào cuối Minh đầu Thanh, và đến năm 1941 mới được in. Đó là một bản tổng hợp muộn, đứng trên vai Kinh Dịch, Đạo Đức Kinh và Binh pháp Tôn Tử.",
     "Mỗi kế có ba phần. Tên kế là một thành ngữ bốn chữ, giúp dễ nhớ. Giải ngữ là lời giải ngắn, thường dẫn Kinh Dịch, và đây mới là phần nguyên lý. Án ngữ là lời bình kèm ví dụ lịch sử. Phần lớn người học chỉ thuộc tên kế, tức là học cái nhãn mà bỏ qua nguyên lý.",
     "Câu mở đầu nói thẳng rằng thời cơ không thể sắp đặt sẵn. Kế không phải công thức để đem áp vào tình huống, mà là cách nhìn giúp bạn nhận ra thời cơ khi nó xuất hiện."
   ],
   example:"Giải ngữ của Man thiên quá hải mô tả đúng cơ chế mà tâm lý học hiện đại gọi là sự quen nhờn: thứ gì lặp lại đủ nhiều thì não thôi chú ý. Cái tên “giấu trời vượt biển” không nói lên điều đó; lời giải thì có.",
   wrong:"Thuộc 36 cái tên và câu chuyện là biết 36 kế.",
   right:"Biết một kế là nói được nó thay đổi điều gì trong nhận thức hay trong thế của đối phương, khi nào nó chạy và khi nào nó gãy.",
   check:{q:"Một người thuộc làu tên và điển tích của cả 36 kế. Gặp một tình huống thật, anh ta lúng túng, không nhận ra kế nào đang diễn ra. Vì sao?",
     opts:[
       {t:"Anh ta chưa thuộc đủ chi tiết của các điển tích.", ok:false, fb:"Thêm chi tiết vẫn là học bề mặt. Tình huống thật hiếm khi giống điển tích, nên nhớ kỹ câu chuyện không giúp nhận ra hình thức mới."},
       {t:"Anh ta nhớ cái nhãn và câu chuyện nhưng không nắm cơ chế, nên không nhận ra kế khi hình thức thay đổi.", ok:true, fb:"Đúng. Hình thức thay đổi theo thời đại, nhưng cơ chế như thói quen, lòng tin hay sự chú ý thì không. Người nắm cơ chế nhận ra kế dù nó mặc áo gì."},
       {t:"36 kế đã lỗi thời, không áp dụng được ngày nay.", ok:false, fb:"Hình thức đã đổi, nhưng não người vẫn quen nhờn, vẫn tin vào thiện chí, vẫn bị kéo theo tín hiệu ồn ào. Cơ chế vẫn còn nguyên giá trị."},
       {t:"Tình huống thật luôn dùng nhiều kế cùng lúc nên không thể nhận ra.", ok:false, fb:"Kế chồng lớp khiến việc nhận diện khó hơn, nhưng không phải là không thể. Người nắm cơ chế vẫn tách được từng lớp."}
     ]},
   explain:"Bằng lời của bạn, hãy giải thích vì sao tên kế chỉ là cái nhãn. Lấy ví dụ một kế mà bạn nghĩ cái tên dễ gây hiểu lầm nếu chỉ hiểu theo nghĩa đen."},

  {id:2, title:"Âm dương và biến dịch", lead:"Mọi trạng thái đều đang chuyển hóa sang mặt đối lập của nó. Vì vậy không có kế nào tốt tuyệt đối, chỉ có kế hợp với thế lúc này.",
   quotes:[
     {zh:"将欲歙之，必固张之；将欲弱之，必固强之；将欲废之，必固兴之；将欲取之，必固与之。", hv:"Tương dục hấp chi, tất cố trương chi; tương dục nhược chi, tất cố cường chi; tương dục phế chi, tất cố hưng chi; tương dục thủ chi, tất cố dữ chi.", vi:"Muốn thu lại, hãy để nó mở rộng; muốn làm yếu, hãy để nó mạnh lên; muốn phế bỏ, hãy để nó hưng thịnh; muốn lấy, hãy cho trước.", src:"Đạo Đức Kinh, chương 36"},
     {zh:"反者道之动。", hv:"Phản giả, đạo chi động.", vi:"Quay ngược trở lại là cách Đạo vận hành.", src:"Đạo Đức Kinh, chương 40"}
   ],
   body:[
     "Âm dương không phải hai thứ đối đầu nhau, mà là hai mặt luôn chứa nhau và chuyển hóa cho nhau. Mạnh chứa mầm yếu, yếu chứa mầm mạnh, đến cực điểm thì đảo chiều. Kinh Dịch, cuốn sách mà giải ngữ của 36 kế trích dẫn liên tục, là một hệ thống mô tả những chuyển hóa ấy.",
     "Hệ quả thứ nhất: một kế hiệu quả trong thế này có thể thành tai họa trong thế khác. Vì vậy, học kế nào cũng phải học điều kiện để nó chạy và điểm khiến nó gãy.",
     "Hệ quả thứ hai: muốn đạt điều gì, nhiều khi phải đi qua mặt đối lập của nó. Muốn bắt thì thả, muốn lấy thì cho, muốn được coi trọng thì tỏ ra vô hại. Logic đường vòng này nằm dưới rất nhiều kế như Dục cầm cố túng, Phao chuyên dẫn ngọc hay Giả si bất điên."
   ],
   example:"Kodak từng thống trị ngành phim ảnh, và một kỹ sư của chính họ đã làm ra một trong những máy ảnh số đầu tiên vào năm 1975. Nhưng mảng phim sinh lời quá lớn khiến công ty chậm chân trước kỹ thuật số. Cái thực đã sinh ra cái hư.",
   wrong:"Có kế mạnh và kế yếu; cứ chọn kế mạnh nhất mà dùng.",
   right:"Kế chỉ mạnh hay yếu khi đặt trong một thế cụ thể. Cùng một nước đi, đúng lúc thì thắng, sai lúc thì bại.",
   check:{q:"Một đối thủ vừa thắng lớn và đang mở rộng thật nhanh ra nhiều thị trường cùng lúc. Theo tư duy biến dịch, bạn nên nhìn tình huống này thế nào?",
     opts:[
       {t:"Họ đang ở đỉnh cao, nên tránh mọi va chạm với họ vô thời hạn.", ok:false, fb:"Tạm tránh có thể là khôn ngoan, nhưng tránh vô thời hạn là coi trạng thái hiện tại là cố định. Đó chính là điều tư duy biến dịch bác bỏ."},
       {t:"Chính sự mở rộng nhanh đang tạo ra những chỗ mỏng: nguồn lực dàn trải, quản lý căng thẳng, tự tin quá mức.", ok:true, fb:"Đúng. Cái mạnh đang sinh ra cái yếu. Bạn không cần lao vào ngay, nhưng cần theo dõi xem chỗ mỏng nào sẽ lộ ra trước."},
       {t:"Phải lập tức mở rộng nhanh như họ để không bị bỏ lại.", ok:false, fb:"Đó là chạy theo nhịp của đối phương, để người khác dẫn dắt mình. Tôn Tử cảnh báo đúng điều này."},
       {t:"Thắng lớn chứng tỏ họ không có điểm yếu nào đáng kể.", ok:false, fb:"Không trạng thái nào thiếu mặt đối lập. Thắng lớn thường đi kèm điểm yếu mới, như sự chủ quan hay một bộ máy phình to."}
     ]},
   explain:"Kể một ví dụ từ đời sống hoặc công việc của bạn, trong đó sức mạnh của một người hay một tổ chức lại chính là nguồn gốc điểm yếu của họ. Giải thích quá trình chuyển hóa ấy."},

  {id:3, title:"Hư và thực", lead:"Hư là chỗ không có sự chuẩn bị, thực là chỗ có. Đánh vào chỗ hư, tránh chỗ thực, và nếu không có chỗ hư thì tạo ra nó.",
   quotes:[
     {zh:"夫兵形象水，水之形，避高而趋下；兵之形，避实而击虚。", hv:"Phù binh hình tượng thủy, thủy chi hình, tị cao nhi xu hạ; binh chi hình, tị thực nhi kích hư.", vi:"Hình thái của quân đội giống như nước. Nước tránh chỗ cao mà chảy xuống chỗ thấp; quân đội tránh chỗ thực mà đánh vào chỗ hư.", src:"Binh pháp Tôn Tử, thiên Hư thực"},
     {zh:"无所不备，则无所不寡。", hv:"Vô sở bất bị, tắc vô sở bất quả.", vi:"Phòng bị khắp mọi nơi thì nơi nào cũng mỏng.", src:"Binh pháp Tôn Tử, thiên Hư thực"},
     {zh:"善战者，致人而不致于人。", hv:"Thiện chiến giả, trí nhân nhi bất trí ư nhân.", vi:"Người giỏi đánh trận dẫn dắt đối phương, chứ không để đối phương dẫn dắt mình.", src:"Binh pháp Tôn Tử, thiên Hư thực"}
   ],
   body:[
     "Mọi lực lượng đều hữu hạn. Canh chỗ này thì hở chỗ kia, nên dù mạnh đến đâu cũng luôn có chỗ hư. Hư thực vì thế là khái niệm tương đối, gắn với từng vị trí và thời điểm, không phải cái nhãn dán lên cả một đối thủ.",
     "Có ba thao tác với hư thực. Thứ nhất là tìm chỗ hư sẵn có. Thứ hai là tạo ra chỗ hư bằng cách kéo, nhử hoặc làm đối phương phân tán. Thứ ba là làm sai lệch nhận thức về hư thực: giả hư mà thực để dụ địch, giả thực mà hư để răn đe. Dương đông kích tây là tạo ra chỗ hư; Không thành kế là giả thực.",
     "Câu “dẫn dắt người chứ không để người dẫn dắt mình” là điểm tựa của tất cả. Ai chọn được nơi và lúc giao tranh, người đó định đoạt chỗ nào là hư, chỗ nào là thực."
   ],
   example:"Trong Vây Ngụy cứu Triệu, quân Ngụy thực ở Hàm Đan nhưng hư ở kinh đô. Thời nay, một công ty nhỏ không lao vào phân khúc cao cấp mà ông lớn canh giữ, mà chiếm phân khúc giá rẻ ông lớn bỏ qua vì biên lợi nhuận thấp. Chỗ hư ấy do chính ưu tiên của ông lớn tạo ra.",
   wrong:"Hư là chỗ yếu kém của đối phương; cứ tìm điểm yếu mà đánh.",
   right:"Hư là chỗ không có sự chuẩn bị, kể cả khi đó là nơi đối phương đáng ra rất mạnh. Và chỗ trông như hư có thể là một cái bẫy.",
   check:{q:"Đối thủ của bạn chăm sóc khách hàng doanh nghiệp lớn rất tốt, nhưng gần như bỏ mặc các cửa hàng nhỏ vì doanh thu thấp. Bạn có ít vốn. Bước đi nào thể hiện đúng tư duy hư thực?",
     opts:[
       {t:"Giảm giá thật sâu để giành khách hàng lớn của họ.", ok:false, fb:"Đây là đánh vào chỗ thực: dùng nguồn lực ít nhất để tấn công nơi đối thủ chuẩn bị kỹ nhất và sẵn sàng bảo vệ nhất."},
       {t:"Phục vụ thật tốt các cửa hàng nhỏ, nơi đối thủ không chuẩn bị và không muốn bảo vệ, rồi lớn dần từ đó.", ok:true, fb:"Đúng. Chỗ hư này bền vững vì nó sinh ra từ chính lựa chọn ưu tiên của đối thủ. Họ khó phản ứng mà không phải hy sinh mảng đang sinh lời."},
       {t:"Tuyên bố công khai sẽ đánh vào mảng khách hàng lớn để họ phân tâm.", ok:false, fb:"Một đòn nhử chỉ có giá trị khi có đòn thật theo sau và mình đủ sức thực hiện. Ở đây nó chỉ khiến đối thủ cảnh giác hơn."},
       {t:"Chờ đến khi có vốn ngang họ rồi mới cạnh tranh.", ok:false, fb:"Chờ đủ mạnh là bỏ qua bản chất của hư thực. Người yếu thắng được chính nhờ biết chọn chỗ đánh."}
     ]},
   explain:"Chọn một đối thủ hoặc một thử thách bạn đang đối mặt. Chỗ thực và chỗ hư của nó là gì? Chỗ hư đó do đâu mà có?"},

  {id:4, title:"Chính và kỳ", lead:"Chính là điều đối phương nhìn thấy và chờ đợi, kỳ là điều họ không ngờ. Thiếu chính thì kỳ không có chỗ dựa, và kỳ dùng mãi sẽ thành chính.",
   quotes:[
     {zh:"凡战者，以正合，以奇胜。", hv:"Phàm chiến giả, dĩ chính hợp, dĩ kỳ thắng.", vi:"Phàm đánh trận, dùng chính để giao chiến, dùng kỳ để giành thắng lợi.", src:"Binh pháp Tôn Tử, thiên Binh thế"},
     {zh:"奇正相生，如循环之无端，孰能穷之？", hv:"Kỳ chính tương sinh, như tuần hoàn chi vô đoan, thục năng cùng chi?", vi:"Kỳ và chính sinh ra nhau, như một vòng tròn không có điểm đầu, ai có thể dùng cạn được?", src:"Binh pháp Tôn Tử, thiên Binh thế"},
     {zh:"兵者，诡道也。故能而示之不能，用而示之不用，近而示之远，远而示之近。", hv:"Binh giả, quỷ đạo dã. Cố năng nhi thị chi bất năng, dụng nhi thị chi bất dụng, cận nhi thị chi viễn, viễn nhi thị chi cận.", vi:"Việc binh là đạo dối trá. Cho nên có thể thì tỏ ra không thể, dùng thì tỏ ra không dùng, gần thì tỏ ra xa, xa thì tỏ ra gần.", src:"Binh pháp Tôn Tử, thiên Thủy kế"}
   ],
   body:[
     "Chính là lực lượng, cách làm, hành động mà đối phương thấy được và dự đoán được. Kỳ là phần nằm ngoài dự đoán. Chính giữ chân đối phương và định hình sự chú ý của họ; kỳ quyết định thắng thua.",
     "Kỳ cần có chính. Một đòn bất ngờ chỉ hiệu quả khi đối phương đã dồn sự chú ý vào cái chính. Đó là lý do trong Ám độ Trần Thương, việc sửa sạn đạo phải thật và rầm rộ: nó là cái chính khiến con đường qua Trần Thương trở thành kỳ.",
     "Kỳ và chính chuyển hóa không ngừng. Một nước đi bất ngờ, khi đã bị đoán ra, trở thành điều được chờ đợi. Người chỉ biết một mánh sẽ sớm bị đọc vị. Người hiểu nguyên lý thì luôn tạo ra được kỳ mới."
   ],
   example:"Ở thành Ung Khâu, đêm đầu tiên những hình nộm rơm của Trương Tuần là kỳ. Những đêm sau chúng thành chính trong mắt quân vây, và năm trăm quân cảm tử thật trở thành kỳ mới. Thời nay, một chiêu quảng cáo gây sốc có thể rất hiệu quả lần đầu; lặp lại vài lần thì khán giả đã chờ sẵn và thờ ơ.",
   wrong:"Kỳ là mánh khóe, chính là cách làm nhàm chán; muốn thắng thì cứ dùng thật nhiều mánh.",
   right:"Không có chính vững thì không có kỳ. Kỳ không phải một mánh cố định, mà là bất cứ điều gì nằm ngoài dự đoán của đối phương vào lúc này.",
   check:{q:"Một đội bóng thắng nhiều trận nhờ lối phản công bất ngờ. Mùa sau, họ dùng đúng lối đó và thua liên tiếp. Theo lăng kính chính kỳ, điều gì đã xảy ra?",
     opts:[
       {t:"Phong độ cầu thủ đi xuống.", ok:false, fb:"Có thể đúng một phần, nhưng câu trả lời này bỏ qua đối thủ. Lối chơi không đổi, thứ thay đổi là điều đối thủ chờ đợi."},
       {t:"Lối phản công đã từ kỳ thành chính: đối thủ nghiên cứu nó và chờ sẵn.", ok:true, fb:"Đúng. Kỳ chỉ là kỳ khi nằm ngoài dự đoán. Muốn thắng tiếp, đội cần một cái chính khác để giữ chân đối thủ và một cái kỳ mới."},
       {t:"Phản công vốn là chiến thuật kém, mùa trước chỉ là ăn may.", ok:false, fb:"Không có chiến thuật kém tuyệt đối. Nó từng thắng chính vì nằm ngoài dự đoán của đối thủ lúc đó."},
       {t:"Họ cần thêm nhiều mánh mới hơn nữa.", ok:false, fb:"Thêm mánh chưa đủ. Mánh cần một cái chính vững để có chỗ dựa, và cần hiểu đối thủ đang chờ đợi điều gì."}
     ]},
   explain:"Giải thích vì sao kỳ cần có chính, bằng một ví dụ ngoài quân sự của riêng bạn."},

  {id:5, title:"Thế", lead:"Thế là cấu trúc của tình huống, thứ khiến một số kết quả trở nên dễ dàng. Người giỏi tạo thế trước, để kế chỉ còn là cú đẩy cuối cùng.",
   quotes:[
     {zh:"故善战者，求之于势，不责于人。", hv:"Cố thiện chiến giả, cầu chi ư thế, bất trách ư nhân.", vi:"Người giỏi đánh trận tìm thắng lợi ở thế, chứ không đòi hỏi ở con người.", src:"Binh pháp Tôn Tử, thiên Binh thế"},
     {zh:"如转圆石于千仞之山者，势也。", hv:"Như chuyển viên thạch ư thiên nhận chi sơn giả, thế dã.", vi:"Như lăn hòn đá tròn từ ngọn núi cao nghìn nhẫn, đó là thế.", src:"Binh pháp Tôn Tử, thiên Binh thế"},
     {zh:"昔之善战者，先为不可胜，以待敌之可胜。", hv:"Tích chi thiện chiến giả, tiên vi bất khả thắng, dĩ đãi địch chi khả thắng.", vi:"Người giỏi đánh trận xưa, trước hết làm cho mình không thể bị đánh bại, rồi chờ lúc đối phương có thể bị đánh bại.", src:"Binh pháp Tôn Tử, thiên Hình"}
   ],
   body:[
     "Tôn Tử phân biệt hình và thế. Hình là thực lực tĩnh: quân số, vũ khí, tiền bạc. Thế là sức mạnh sinh ra từ vị trí, thời điểm và quan hệ. Hòn đá tròn tự nó không đáng sợ; đặt trên đỉnh núi cao thì không gì cản nổi.",
     "Kế chỉ chạy trong thế phù hợp. Cách sắp xếp sáu nhóm kế cũng phản ánh điều này: đi từ khi mình có ưu thế, với Thắng chiến kế, đến khi thất thế, với Bại chiến kế. Câu hỏi đầu tiên nên là: mình đang ở thế nào? Chọn kế nào là chuyện sau.",
     "Thế bắt đầu từ phòng thủ. Trước hết làm cho mình không thể bị đánh bại, rồi chờ đối phương để lộ chỗ có thể bị đánh bại. Không thua nằm trong tay mình; thắng thì còn phụ thuộc vào đối phương."
   ],
   example:"Ở trận Bạch Đằng năm 1288, thủy triều, lòng sông và bãi cọc tạo thành thế; trận đánh chỉ là thời điểm thế ấy được kích hoạt. Thời nay, cùng một lời đề nghị tăng lương sẽ có sức nặng hoàn toàn khác khi bạn đã có một lời mời làm việc khác trong tay. Lời nói không đổi, thế đã đổi.",
   wrong:"Thắng là nhờ có kế hay.",
   right:"Thắng là nhờ thế. Kế hay đặt sai thế thì vô dụng, thậm chí phản tác dụng.",
   check:{q:"Bạn sắp đàm phán tăng lương nhưng chưa có lựa chọn công việc nào khác, và sếp biết điều đó. Theo tư duy về thế, việc nào nên làm trước?",
     opts:[
       {t:"Học vài kỹ thuật thuyết phục để dùng trong buổi nói chuyện.", ok:false, fb:"Kỹ thuật thuyết phục là kế. Khi thế đang bất lợi, kế khéo đến đâu cũng chỉ thay đổi được rất ít."},
       {t:"Giả vờ có lời mời khác để gây áp lực.", ok:false, fb:"Đây là canh bạc kiểu Không thành kế trong thế yếu. Nếu sếp muốn kiểm chứng, bạn mất uy tín, mà đây lại là quan hệ lâu dài."},
       {t:"Cải thiện thế trước: tích lũy kết quả chứng minh được, nắm mặt bằng lương, tạo lựa chọn thật, rồi mới đàm phán.", ok:true, fb:"Đúng. Đó là làm cho mình “không thể bị đánh bại” trước. Khi thế đã đổi, cuộc đàm phán gần như tự nghiêng về phía bạn."},
       {t:"Đàm phán ngay để thể hiện sự quyết đoán.", ok:false, fb:"Quyết đoán không thay thế được thế. Vào cuộc khi thế bất lợi là để đối phương chọn kết quả."}
     ]},
   explain:"Mô tả một tình huống bạn từng gặp, trong đó thế quyết định kết quả nhiều hơn tài năng hay lời nói. Thế ấy được tạo nên từ những yếu tố nào?"},

  {id:6, title:"Áp dụng vào đời sống hiện nay", lead:"Kế nào cũng là can thiệp vào mục tiêu, nguồn lực, thông tin hoặc niềm tin của các bên. Và trong quan hệ lâu dài, lừa dối thường tự hủy.",
   quotes:[
     {zh:"上兵伐谋，其次伐交，其次伐兵，其下攻城。", hv:"Thượng binh phạt mưu, kỳ thứ phạt giao, kỳ thứ phạt binh, kỳ hạ công thành.", vi:"Cách dùng binh cao nhất là phá mưu kế của địch, kế đến là phá liên minh của địch, kế đến là đánh quân địch, kém nhất là đánh thành.", src:"Binh pháp Tôn Tử, thiên Mưu công"},
     {zh:"不战而屈人之兵，善之善者也。", hv:"Bất chiến nhi khuất nhân chi binh, thiện chi thiện giả dã.", vi:"Không đánh mà khuất phục được quân địch mới là giỏi nhất trong những cái giỏi.", src:"Binh pháp Tôn Tử, thiên Mưu công"}
   ],
   body:[
     "Bốn biến số. Mỗi bên trong một cuộc đối đầu đều có mục tiêu, nguồn lực, thông tin và niềm tin. Kế nào cũng là sự can thiệp vào một trong bốn thứ ấy, của đối phương hoặc của bên thứ ba. Thứ bậc của Tôn Tử cho thấy can thiệp càng sớm, càng gần với ý đồ, thì càng ít tốn sức.",
     "Trò chơi một lần và trò chơi lặp lại. Lý thuyết trò chơi cho thấy lừa dối có thể hiệu quả khi hai bên chỉ gặp nhau một lần. Trong quan hệ lặp lại như đồng nghiệp, đối tác, khách hàng hay gia đình, cái giá của việc bị lộ là uy tín, và uy tín thường đáng giá hơn bất kỳ thắng lợi đơn lẻ nào. Trước khi nghĩ đến kế, hãy hỏi mình đang ở trong loại quan hệ nào.",
     "Điểm mù. Nhiều kế là cách khai thác có hệ thống những thiên kiến của não người: sự quen nhờn với Man thiên quá hải, việc tin chắc vào kết luận đã rút ra với Vô trung sinh hữu, thói quen đánh giá người khác theo hình ảnh cũ với Không thành kế. Hiểu thiên kiến đứng sau một kế giúp bạn nhận ra nó dưới mọi hình thức và tự phòng thủ."
   ],
   example:"Một nhà cung cấp lâu năm chơi xấu khách hàng một lần để kiếm thêm lời. Họ thắng một đơn hàng nhưng mất toàn bộ các đơn hàng tương lai: thắng một trận, thua cả cuộc chiến.",
   wrong:"Học 36 kế để lừa người khác giỏi hơn.",
   right:"Giá trị lớn nhất của 36 kế với đa số người là nhìn rõ cấu trúc của xung đột và nhận ra khi chính mình đang bị dẫn dắt.",
   check:{q:"Bạn có thể dùng một mẹo để ép một đối tác lâu năm chấp nhận điều khoản có lợi cho mình lần này. Họ sẽ không phát hiện ngay, nhưng về sau có thể nhận ra. Phân tích nào thể hiện tư duy bản chất?",
     opts:[
       {t:"Mẹo hiệu quả thì nên dùng, vì kinh doanh là chiến trường.", ok:false, fb:"Cách nghĩ này coi một trò chơi lặp lại như trò chơi một lần, và bỏ qua cái giá dài hạn của việc mất lòng tin."},
       {t:"Đây là trò chơi lặp lại: lợi ích lần này phải đặt cạnh rủi ro mất lòng tin trong mọi lần sau, và thường là không đáng.", ok:true, fb:"Đúng. Đây là câu hỏi về loại quan hệ, được đặt ra trước khi nghĩ đến chuyện kế có hiệu quả hay không."},
       {t:"Không bao giờ được dùng bất kỳ chiến thuật nào với đối tác.", ok:false, fb:"Quá tuyệt đối. Nhiều chiến thuật minh bạch như cải thiện thế của mình hay chọn thời điểm đàm phán hoàn toàn chính đáng."},
       {t:"Chỉ cần đảm bảo họ không bao giờ phát hiện ra.", ok:false, fb:"Đây là đặt cược vào điều bạn không kiểm soát được, và vẫn né câu hỏi cốt lõi về loại quan hệ."}
     ]},
   explain:"Chọn một kế bất kỳ bạn biết. Nó tác động vào biến số nào trong bốn biến số, và khai thác điểm mù nào của con người?"},

  {id:7, title:"Ba câu hỏi cần đặt ra trước", lead:"Gặp bất kỳ tình huống đối đầu nào, hãy trả lời ba câu này trước khi nghĩ tới kế. Thường thì câu trả lời sẽ tự hiện ra.",
   quotes:[
     {zh:"知彼知己，百战不殆。", hv:"Tri bỉ tri kỷ, bách chiến bất đãi.", vi:"Biết người biết mình, trăm trận không nguy.", src:"Binh pháp Tôn Tử, thiên Mưu công"}
   ],
   body:[
     "Mục tiêu thật của mình là gì? Nhiều người thắng một trận nhưng mất thứ quan trọng hơn. Mục tiêu bề mặt có thể là “thắng cuộc cãi nhau”, còn mục tiêu thật là “giữ được mối quan hệ và được tôn trọng”.",
     "Thế hiện tại ra sao? Mình mạnh ở đâu, yếu ở đâu, và thời gian đang đứng về phía ai? Đây là lúc dùng hư thực và hình thế.",
     "Đối phương đang tin gì và muốn gì? Họ nhìn tình huống thế nào, điều gì khiến họ hành động, và đây là quan hệ một lần hay lặp lại? Đừng chiếu suy nghĩ của mình lên họ.",
     "Chỉ khi trả lời xong ba câu này mới đến câu hỏi “dùng kế nào”. Đôi khi câu trả lời là không cần dùng kế nào cả."
   ],
   example:"",
   wrong:"Gặp chuyện là lục trí nhớ xem kế nào hợp.",
   right:"Gặp chuyện là phân tích mục tiêu, thế và đối phương trước. Kế, nếu cần, sẽ tự lộ ra từ phân tích ấy.",
   check:null,
   explain:""},

  {id:8, title:"Bản đồ 36 kế", extra:"map", lead:"36 kế có thể sắp xếp theo hai cách. Cách truyền thống chia theo thế của mình; cách theo lăng kính chia theo thứ mà kế tác động vào.",
   quotes:[
     {zh:"檀公三十六策，走是上计。", hv:"Đàn công tam thập lục sách, tẩu thị thượng kế.", vi:"Ba mươi sáu sách của Đàn công, chạy là thượng sách.", src:"Nam Tề thư, truyện Vương Kính Tắc"}
   ],
   body:[
     "Cách sắp xếp truyền thống chia 36 kế thành sáu nhóm, mỗi nhóm sáu kế, theo thế của người dùng kế. Ba nhóm đầu dành cho khi mình có ưu thế, ngang sức hoặc chủ động tấn công. Ba nhóm sau dành cho khi tình thế rối ren, khi phải xoay xở trong liên minh, và khi thất thế. Kế cuối cùng của nhóm cuối cùng là Tẩu vi thượng sách: biết rút lui để bảo toàn lực cũng là một kế.",
     "Cách sắp xếp theo lăng kính chia theo cơ chế: kế tác động vào nhận thức, vào thời cơ và nguồn lực, vào vị trí, thông qua bên thứ ba, vào tâm lý và động cơ, hay vào trọng tâm và cấu trúc của đối phương. Web này dùng cách sắp xếp đó, vì nó giúp nhận ra các kế cùng họ dù tên gọi rất khác nhau.",
     "Hai cách nhìn bổ sung cho nhau. Nhóm truyền thống trả lời câu hỏi “lúc nào nên dùng”; lăng kính trả lời “nó hoạt động thế nào”. Cách xếp theo lăng kính chỉ mang tính tương đối, vì nhiều kế tác động lên nhiều thứ cùng lúc. Khi học xong một kế, bạn hoàn toàn có thể không đồng ý với cách xếp và tự xếp lại."
   ],
   example:"",
   wrong:"Mỗi kế có một chỗ cố định, cứ thuộc kế nào nằm nhóm nào là xong.",
   right:"Nhóm truyền thống là lời nhắc về thế, lăng kính là lời gợi ý về cơ chế. Cả hai đều là công cụ để suy nghĩ, không phải ngăn kéo để cất kế.",
   check:{q:"Bạn đang thất thế rõ ràng trong một cuộc cạnh tranh. Một người bạn khuyên dùng Sấn hỏa đả kiếp, tức là ra tay đúng lúc đối phương gặp nạn. Nhìn vào bản đồ, nhận xét nào hợp lý nhất?",
     opts:[
       {t:"Kế nào cũng dùng được bất cứ lúc nào, việc phân nhóm không quan trọng.", ok:false, fb:"Nhóm truyền thống tồn tại để nhắc rằng kế gắn với thế. Bỏ qua nó là quay lại lối chọn kế theo sở thích."},
       {t:"Kế này nằm trong nhóm dành cho khi có ưu thế. Trước khi dùng, cần hỏi: lúc đối phương gặp nạn, mình có đủ lực để khai thác không, hay thế đã thực sự đảo chiều?", ok:true, fb:"Đúng. Bản đồ không cấm, nhưng nó đặt ra đúng câu hỏi. Có lúc đối phương gặp nạn khiến tương quan đảo chiều thật, có lúc mình vẫn quá yếu để tận dụng."},
       {t:"Khi thất thế thì tuyệt đối chỉ được dùng các kế trong nhóm Bại chiến.", ok:false, fb:"Quá máy móc. Thế thay đổi liên tục, và một biến cố có thể đảo tương quan chỉ trong chốc lát. Phân nhóm là gợi ý, không phải luật."},
       {t:"Nên chọn kế theo lăng kính và bỏ qua nhóm truyền thống.", ok:false, fb:"Lăng kính cho biết kế hoạt động thế nào, nhưng không cho biết lúc nào nên dùng. Hai cách nhìn cần đi cùng nhau."}
     ]},
   explain:"Nhìn bản đồ, chọn một kế bạn chưa học mà chỉ đọc tên đã đoán được phần nào cơ chế. Hãy đoán cơ chế của nó và giải thích vì sao nó được xếp vào nhóm truyền thống đó. Khi học đến kế ấy, quay lại đối chiếu."},

  {id:9, title:"Khung 5 câu hỏi phân tích một kế", lead:"Năm câu hỏi giúp bạn hiểu một kế đến tận cơ chế: nó thay đổi điều gì, cần gì để chạy, khi nào gãy, nhận ra nó thế nào, và nó trông ra sao ngoài đời.",
   quotes:[
     {zh:"故兵无常势，水无常形；能因敌变化而取胜者，谓之神。", hv:"Cố binh vô thường thế, thủy vô thường hình; năng nhân địch biến hóa nhi thủ thắng giả, vị chi thần.", vi:"Quân không có thế cố định, nước không có hình cố định. Người biết theo sự biến hóa của địch mà giành thắng lợi thì gọi là bậc thần.", src:"Binh pháp Tôn Tử, thiên Hư thực"}
   ],
   body:[
     "Cơ chế: kế này thay đổi điều gì? Hãy diễn đạt bằng một câu, không dùng thành ngữ, không kể lại điển tích. Gắn nó với nền tảng: kế tạo ra chỗ hư hay khai thác chỗ hư sẵn có, dựa vào cái chính nào, tác động vào biến số nào trong bốn biến số mục tiêu, nguồn lực, thông tin và niềm tin.",
     "Điều kiện: cần có gì thì kế mới chạy? Mỗi kế giả định một thế nhất định: đối phương phải tin điều gì, mình phải có gì, thời gian phải đứng về phía ai. Dùng kế khi thiếu điều kiện thường phản tác dụng.",
     "Điểm gãy: kế thất bại khi nào, và đối phương làm gì thì vô hiệu hóa được nó? Đây là câu hỏi cho thấy bạn hiểu thật, vì người chỉ thuộc kế hiếm khi nghĩ tới nó.",
     "Nhận diện: nếu người khác dùng kế này lên bạn, dấu hiệu là gì? Câu trả lời tốt chỉ ra hành vi quan sát được, không phải cảm giác chung chung.",
     "Chuyển hóa: một ví dụ ngoài quân sự do chính bạn tìm ra. Ví dụ tốt giữ nguyên cơ chế nhưng thay hẳn hình thức. Nếu ví dụ chỉ giống điển tích ở bề ngoài, có thể bạn đang khớp theo hình thức chứ chưa theo cơ chế."
   ],
   example:"Áp dụng cho Vây Ngụy cứu Triệu. Cơ chế là đe dọa một điểm mà đối phương coi trọng hơn mục tiêu họ đang theo đuổi, buộc họ rời thế chủ động. Điều kiện là đối phương có một điểm như vậy và mối đe dọa phải là thật. Kế gãy khi họ hạ được mục tiêu trước khi kịp quay về, hoặc không thật sự quý điểm bị đe dọa. Dấu hiệu nhận diện là bị gây áp lực đột ngột ở chỗ khác đúng lúc mình đang dồn sức. Ví dụ ngoài quân sự: khi một đối thủ lớn phá giá ở thị trường chính của bạn, bạn tấn công vào mảng sinh lời cốt lõi của họ.",
   wrong:"Hiểu một kế là kể được điển tích và giải thích được ý nghĩa cái tên.",
   right:"Hiểu một kế là trả lời được cả năm câu hỏi, nhất là điểm gãy, và tìm được ví dụ có cùng cơ chế dù khác hẳn hình thức.",
   check:{q:"Hai người học cùng phân tích kế Điệu hổ ly sơn, tức là dụ hổ rời núi. Người A viết: “Kế này là dụ con hổ ra khỏi núi, giống như dụ đối thủ ra khỏi sân nhà.” Người B viết: “Đối phương mạnh nhờ vị trí chứ không nhờ bản thân họ; kế này tách họ khỏi vị trí đó trước khi giao chiến. Nó gãy khi họ không chịu rời đi, hoặc vẫn mạnh ngay cả khi ở ngoài vị trí ấy.” Bài nào thể hiện hiểu bản chất?",
     opts:[
       {t:"Bài của A, vì giữ đúng hình ảnh của tên kế nên dễ nhớ.", ok:false, fb:"A chỉ diễn lại cái tên bằng một hình ảnh khác. Bài không nói vì sao rời núi thì hổ yếu đi, cần điều kiện gì, hay khi nào kế thất bại."},
       {t:"Bài của B, vì chỉ ra nguồn sức mạnh thật của đối phương, cơ chế tách nó ra, và khi nào kế gãy.", ok:true, fb:"Đúng. B còn nối được với bài Thế: sức mạnh đến từ vị trí chứ không từ bản thân, giống hòn đá tròn trên đỉnh núi."},
       {t:"Hai bài như nhau, chỉ khác cách diễn đạt.", ok:false, fb:"Khác nhau về chất. A dừng ở hình ảnh, còn B trả lời được câu hỏi cơ chế và câu hỏi điểm gãy."},
       {t:"Không bài nào đạt, vì cả hai đều chưa kể điển tích.", ok:false, fb:"Điển tích là minh họa, không phải bằng chứng của sự hiểu. Nhiều người kể điển tích rất hay mà vẫn không nói được cơ chế."}
     ]},
   explain:"Chọn một kế bạn chưa học trong web (xem bản đồ ở bài 8). Thử trả lời năm câu hỏi chỉ dựa vào tên kế và những gì bạn đã học ở phần nền tảng. Chỗ nào bạn không trả lời được chính là chỗ cần tìm hiểu khi học đến kế đó."},

  {id:10, title:"Phá kế và phòng thủ", lead:"Kế nào cũng có điểm gãy, nên kế nào cũng có cách phá. Với đa số người, biết phá kế còn hữu ích hơn biết dùng kế.",
   quotes:[
     {zh:"不可胜在己，可胜在敌。", hv:"Bất khả thắng tại kỷ, khả thắng tại địch.", vi:"Không bị đánh bại là ở mình, đánh bại được địch là ở địch.", src:"Binh pháp Tôn Tử, thiên Hình"},
     {zh:"无恃其不来，恃吾有以待也。", hv:"Vô thị kỳ bất lai, thị ngô hữu dĩ đãi dã.", vi:"Đừng trông vào việc địch không đến, mà hãy trông vào việc mình đã có sẵn cách đối phó.", src:"Binh pháp Tôn Tử, thiên Cửu biến"}
   ],
   body:[
     "Mỗi kế dựa trên vài giả định về đối phương: họ sẽ tin điều này, sẽ phản ứng thế kia, sẽ không kiểm tra điều nọ. Phá kế là làm cho những giả định ấy sai. Vì vậy câu hỏi “điểm gãy” trong khung 5 câu hỏi cũng chính là câu hỏi “phá kế này thế nào”.",
     "Năm thói quen phòng thủ phá được phần lớn các kế. Kiểm chứng rẻ: trước khi phản ứng với một tín hiệu, tìm cách kiểm tra nó với chi phí thấp; Thụ thượng khai hoa và Không thành kế đều sụp trước một phép thử nhỏ. Giữ lực dự bị: không dồn hết theo tín hiệu ồn ào nhất, như cách Chu Á Phu phá Dương đông kích tây. Tách thái độ khỏi cam kết: thân thiện đến đâu cũng giữ nguyên các lớp bảo vệ, phá được Tiếu lý tàng đao.",
     "Không khóa kết luận: luôn hỏi “nếu lần này khác thì sao”, phá được Man thiên quá hải và Vô trung sinh hữu. Nhìn vào nguồn lực thay vì dáng vẻ: đánh giá người khác theo những gì họ nắm trong tay, phá được Giả si bất điên.",
     "Đoán trúng từng kế là việc khó và mệt. Cách phòng thủ bền hơn là xây thế khiến kế của đối phương khó thành: có lựa chọn thay thế, có nguồn thông tin độc lập, có người dám nói ngược với mình. Đó là tinh thần của câu “trông vào việc mình đã có sẵn cách đối phó”.",
     "Nhưng đừng rơi vào đa nghi. Nghi ngờ mọi thứ khiến bạn tê liệt, và chính sự đa nghi cũng là điểm yếu để người khác khai thác: Tư Mã Ý trong Tam quốc diễn nghĩa trúng Không thành kế chính vì quá đa nghi. Mục tiêu là kiểm chứng có chọn lọc, không phải nghi ngờ tất cả."
   ],
   example:"Một công ty nhận đơn hàng lớn bất thường từ một khách hàng mới, kèm lời khen nồng nhiệt và đề nghị giao hàng trước, thanh toán sau. Thay vì từ chối hay đồng ý ngay, họ kiểm chứng rẻ: tra thông tin doanh nghiệp, đề nghị đặt cọc một phần, giao một lô nhỏ trước. Khách hàng thật không ngại những bước này; kẻ lừa đảo thường biến mất.",
   wrong:"Muốn không bị lừa thì phải nghi ngờ tất cả mọi người.",
   right:"Muốn không bị lừa thì cần thói quen kiểm chứng rẻ và một cái thế khiến mình khó bị tổn thương, kể cả khi đoán sai ý đồ của người khác.",
   check:{q:"Một đối thủ vốn yếu hơn bạn bỗng tung tin họ vừa được một quỹ lớn rót vốn và sắp mở rộng sang thị trường chính của bạn. Bạn chưa rõ tin này thật hay giả. Cách phản ứng nào thể hiện đúng tư duy phòng thủ?",
     opts:[
       {t:"Lập tức dồn ngân sách vào thị trường đó để chặn trước.", ok:false, fb:"Đây là phản ứng theo một tín hiệu chưa kiểm chứng. Nếu đó là đòn nhử, bạn vừa làm đúng điều đối thủ muốn và có thể bỏ trống chỗ khác."},
       {t:"Coi đó là tin bịa và bỏ qua hoàn toàn.", ok:false, fb:"Đây là khóa kết luận. Nếu tin là thật, thiệt hại sẽ rất lớn; đó chính là cách Vô trung sinh hữu thắng ở pha thứ hai."},
       {t:"Kiểm chứng bằng cách rẻ như xem hồ sơ đăng ký, hỏi nguồn tin trong ngành, theo dõi tin tuyển dụng của họ; giữ phản ứng ở mức điều chỉnh được và tiếp tục củng cố thị trường chính.", ok:true, fb:"Đúng. Bạn không cần biết chắc ý đồ của đối thủ: kiểm chứng rẻ giúp giảm bất định, còn củng cố thế giúp bạn đứng vững dù tin đó thật hay giả."},
       {t:"Tung tin ngược rằng mình cũng sắp được rót vốn lớn.", ok:false, fb:"Đáp trả bằng một kế khác khi chưa hiểu tình hình là để đối phương dẫn dắt. Nếu tin của bạn bị kiểm chứng, bạn còn mất uy tín."}
     ]},
   explain:"Nghĩ về một lần bạn từng bị thuyết phục, bị dẫn dắt hoặc bị lừa. Giả định nào của bạn đã bị khai thác? Thói quen phòng thủ nào trong bài này có thể đã giúp bạn?"}
];
