const imgDecoHalftone = "https://www.figma.com/api/mcp/asset/96c6a1d2-d435-4473-abf2-05202a57a7f5.png";
const imgDecoPaperGrain = "https://www.figma.com/api/mcp/asset/5e4f7705-e2d1-4dc3-a952-59a028e0a619.png";
const imgNhNhanInSatinCareLabel = "https://www.figma.com/api/mcp/asset/fe4df29b-18cd-491f-b1b5-ba298564dc73.png";
const imgNhNhanDt = "https://www.figma.com/api/mcp/asset/52bbd88d-45ec-4ecc-b5dc-ce5a37ef069d.png";
const imgNhThBaiHangtag = "https://www.figma.com/api/mcp/asset/a5280c1d-6f97-4141-b71e-2fe6663ed715.png";
const imgNhRuyBangIn = "https://www.figma.com/api/mcp/asset/22262286-69c8-4be1-bc14-5a8ff45b81a0.png";
const imgNhTemDanDecal = "https://www.figma.com/api/mcp/asset/1d8882e9-0678-41ec-8bec-beb06b793dcc.png";
const imgNhHpGiyTheoYeuCu = "https://www.figma.com/api/mcp/asset/5ac46eed-4c8c-4400-9a87-326300c04aa4.png";
const imgNhPhLiuMay = "https://www.figma.com/api/mcp/asset/016cc5d8-34fd-4cec-87be-587c779d3837.png";
const imgSDXngBnIn = "https://www.figma.com/api/mcp/asset/858c1e5f-58dc-43c1-8861-b0bd8e617c31.png";
const imgNhBiaFacebook = "https://www.figma.com/api/mcp/asset/ed7880fd-0e7b-496e-a02d-fc37791b6fd9.png";
const imgAvatarGoi = "https://www.figma.com/api/mcp/asset/c897d10f-b698-4660-b3c7-e47fcdacfaff.png";
const imgDecoRegistration = "https://www.figma.com/api/mcp/asset/3c4a0a5d-d058-4c58-8f36-ec497c05e9fd.svg";
const imgIconPhone = "https://www.figma.com/api/mcp/asset/00eb08eb-9977-4813-8d79-108c5bd69257.svg";
const imgIconBag = "https://www.figma.com/api/mcp/asset/fabf4fff-df6e-42f3-8e05-8cc54376f225.svg";
const imgTrailingIcon = "https://www.figma.com/api/mcp/asset/5d433893-26f6-4e05-b63c-f327e8c8c4c3.svg";
const imgGroup = "https://www.figma.com/api/mcp/asset/69d48878-d183-4e28-9639-36f5b3a723aa.svg";
const imgIconScissors = "https://www.figma.com/api/mcp/asset/cc6e760d-65f4-4627-bcff-282d388e2424.svg";
const imgLine = "https://www.figma.com/api/mcp/asset/a9c63351-c393-4456-96fa-331a0ae69ab9.svg";
const imgTrailingIcon1 = "https://www.figma.com/api/mcp/asset/5f4086a0-5cd5-4ac7-a8ff-ff8e64e4ce2e.svg";
const imgIconBox = "https://www.figma.com/api/mcp/asset/3f466a1d-7183-4571-b7cf-f88593aa1368.svg";
const imgIconFacebook = "https://www.figma.com/api/mcp/asset/c5c3bf59-618b-402f-ae93-3a6eb6d614cc.svg";
const imgIconYoutube = "https://www.figma.com/api/mcp/asset/6a620219-f46c-4919-8034-080a69e61380.svg";
const imgIconTiktok = "https://www.figma.com/api/mcp/asset/d7af6186-86ea-4c01-a061-9715cdbfa9f9.svg";
const imgIconChat = "https://www.figma.com/api/mcp/asset/9e40aa96-3bfb-4e12-a98d-1f7cfc31332a.svg";
const imgIconPin = "https://www.figma.com/api/mcp/asset/242f5e82-14a8-45d5-8a8a-f65266334b5e.svg";
const imgIconPhone1 = "https://www.figma.com/api/mcp/asset/781b5852-dfdf-49f0-9cdf-07a88dd4a18c.svg";
const imgIconFactory = "https://www.figma.com/api/mcp/asset/46713156-29f7-4bf3-b269-a491962c6fb9.svg";
const imgIconChat1 = "https://www.figma.com/api/mcp/asset/88870b65-036a-49f1-b0a7-23ebaf79e71d.svg";
const imgIconArrowU = "https://www.figma.com/api/mcp/asset/1e91952f-66a1-453e-9132-247159baf12d.svg";
const imgIconChat2 = "https://www.figma.com/api/mcp/asset/cc2afce7-84d5-4358-a396-f42a9a6376be.svg";
const imgDecoRegistration1 = "https://www.figma.com/api/mcp/asset/bb55e540-79b7-46a0-95e7-39f6c548dc4c.svg";
const imgIconPin1 = "https://www.figma.com/api/mcp/asset/ec86a769-118b-4206-8bda-8f91a39e8b69.svg";
const imgIconArrowUr = "https://www.figma.com/api/mcp/asset/9ddf31ca-d72e-4026-8cf6-f63ca1ed4e03.svg";
const imgIconChat3 = "https://www.figma.com/api/mcp/asset/78566196-0919-4d77-a5a0-a576de97c563.svg";

function DecoHalftone({ className }: { className?: string }) {
  return (
    <div className={className || "h-[400px] relative w-[800px]"} data-node-id="158:591" data-name="Deco/Halftone">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgDecoHalftone} />
    </div>
  );
}

export default function DchVDesktop1440() {
  return (
    <div className="bg-[var(--base\/white,white)] content-stretch flex flex-col items-start relative size-full" data-node-id="238:8138" data-name="Dịch Vụ - Desktop 1440">
      <div className="bg-[var(--paper\/light,#f7f7f7)] border border-[var(--line\/default,rgba(1,1,1,0.13))] border-solid content-stretch flex h-[36px] items-center justify-center overflow-clip p-[var(--spacing\/padding\/xsmall,8px)] relative shrink-0 w-full" data-node-id="238:8139" data-name="Topbar">
        <p className="[word-break:break-word] font-[family-name:var(--typography\/font-family\/sans,'Inter:Medium')] font-[var(--emphasis\/font-weight\/medium,500)] leading-[var(--typography\/line-height\/body-small,16px)] not-italic relative shrink-0 text-[color:var(--base\/white,white)] text-[length:var(--typography\/font-size\/body-small,12px)] tracking-[var(--typography\/letter-spacing\/body-small,0px)] whitespace-nowrap" data-node-id="238:8140">
          Xưởng In Bao Bì GÓI | Tân Thới Hiệp, Q12, TP.HCM | 21 Mẫu Hộp Có Sẵn | Đặt Theo Set 100 | Hotline: 0387 365 020
        </p>
        <div className="absolute content-stretch flex items-start left-[63px] top-[12px]" data-node-id="238:8141" data-name="Deco · CMYK">
          <div className="bg-[#00a0e9] relative shrink-0 size-[10px]" data-node-id="I238:8141;158:553" data-name="Rectangle" />
          <div className="bg-[#e4007f] relative shrink-0 size-[10px]" data-node-id="I238:8141;158:554" data-name="Rectangle" />
          <div className="bg-[#fff100] relative shrink-0 size-[10px]" data-node-id="I238:8141;158:555" data-name="Rectangle" />
          <div className="bg-[var(--ink\/strong,#121212)] relative shrink-0 size-[10px]" data-node-id="I238:8141;158:556" data-name="Rectangle" />
          <div className="bg-[var(--ink\/strong,#121212)] relative shrink-0 size-[10px]" data-node-id="I238:8141;158:557" data-name="Rectangle" />
          <div className="bg-[var(--ink\/strong,#121212)] relative shrink-0 size-[10px]" data-node-id="I238:8141;158:558" data-name="Rectangle" />
          <div className="bg-[var(--ink\/strong,#121212)] relative shrink-0 size-[10px]" data-node-id="I238:8141;158:559" data-name="Rectangle" />
          <div className="bg-[var(--brand\/red,#ff6bd5)] relative shrink-0 size-[10px]" data-node-id="I238:8141;158:560" data-name="Rectangle" />
          <div className="bg-[var(--brand\/gold-foil,#a67c2e)] relative shrink-0 size-[10px]" data-node-id="I238:8141;158:561" data-name="Rectangle" />
        </div>
        <div className="absolute left-[1363px] size-[12px] top-[11px]" data-node-id="238:8142" data-name="Deco/Registration">
          <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgDecoRegistration} />
        </div>
      </div>
      <div className="bg-[var(--base\/white,white)] border-[var(--line\/default,rgba(1,1,1,0.13))] border-b border-solid content-stretch flex h-[84px] items-center justify-between px-[32px] relative shrink-0 w-full" data-node-id="238:8143" data-name="Header Navigation">
        <a className="[word-break:break-word] block cursor-pointer font-[family-name:var(--typography\/font-family\/heading,'Lora:SemiBold')] font-[var(--emphasis\/font-weight\/bold,600)] leading-[0] relative shrink-0 text-[color:var(--ink\/strong,#121212)] text-[length:var(--typography\/font-size\/heading-1,34px)] tracking-[var(--typography\/letter-spacing\/heading-1,-0.68px)] whitespace-nowrap" data-node-id="I238:8143;226:4426">
          <p className="leading-[var(--typography\/line-height\/heading-1,42px)]">GÓI</p>
        </a>
        <div className="[word-break:break-word] content-stretch flex font-[family-name:var(--typography\/font-family\/sans,'Inter:Medium')] font-[var(--emphasis\/font-weight\/medium,500)] gap-[24px] items-center leading-[var(--typography\/line-height\/body-base,20px)] not-italic overflow-clip relative shrink-0 text-[color:var(--ink\/strong,#121212)] text-[length:var(--typography\/font-size\/body-base,14px)] tracking-[var(--typography\/letter-spacing\/body-base,-0.14px)] whitespace-nowrap" data-node-id="I238:8143;226:4427" data-name="Nav Links">
          <p className="relative shrink-0" data-node-id="I238:8143;226:4428">
            Mẫu Hộp
          </p>
          <p className="relative shrink-0" data-node-id="I238:8143;226:4429">
            Bảng Giá
          </p>
          <p className="relative shrink-0" data-node-id="I238:8143;226:4430">
            Dịch Vụ
          </p>
          <p className="relative shrink-0" data-node-id="I238:8143;226:4431">
            Quy Trình
          </p>
          <p className="relative shrink-0" data-node-id="I238:8143;226:4432">
            Thiết Kế
          </p>
          <p className="relative shrink-0" data-node-id="I238:8143;226:4433">
            Cẩm Nang
          </p>
          <p className="relative shrink-0" data-node-id="I238:8143;226:4434">
            Hồ Sơ Năng Lực
          </p>
          <p className="relative shrink-0" data-node-id="I238:8143;226:4435">
            Liên Hệ
          </p>
        </div>
        <div className="content-stretch flex gap-[14px] items-center relative shrink-0" data-node-id="I238:8143;226:4436" data-name="Header Actions">
          <div className="content-stretch flex gap-[6px] items-center overflow-clip relative shrink-0" data-node-id="I238:8143;226:4437" data-name="Hotline">
            <div className="relative shrink-0 size-[16px]" data-node-id="I238:8143;226:4438" data-name="Icon/phone">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIconPhone} />
            </div>
            <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[14px] text-[color:var(--brand\/red,#ff6bd5)] whitespace-nowrap" data-node-id="I238:8143;226:4440">
              0387 365 020
            </p>
          </div>
          <div className="bg-[var(--base\/white,white)] border border-[var(--ink\/strong,#121212)] border-solid content-stretch flex gap-[8px] h-[40px] items-center pl-[12px] pr-[10px] relative rounded-[var(--radius\/luxury,12px)] shrink-0" data-node-id="I238:8143;226:4441" data-name="Cart Btn">
            <div className="relative shrink-0 size-[18px]" data-node-id="I238:8143;226:4441;195:1586" data-name="Icon/bag">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIconBag} />
            </div>
            <p className="[word-break:break-word] font-[family-name:var(--typography\/font-family\/button,'Inter:Semi_Bold')] font-[var(--emphasis\/font-weight\/bold,600)] leading-[var(--typography\/line-height\/button-label-xs,12px)] not-italic relative shrink-0 text-[color:var(--ink\/strong,#121212)] text-[length:var(--typography\/font-size\/button-label-xs,12px)] tracking-[var(--typography\/letter-spacing\/button-label-xs,0px)] whitespace-nowrap" data-node-id="I238:8143;226:4441;195:1590">
              GIỎ BÁO GIÁ
            </p>
            <div className="bg-[var(--brand\/red,#ff6bd5)] content-stretch flex h-[18px] items-center justify-center min-w-[18px] overflow-clip px-[5px] relative rounded-[var(--radius\/luxury,12px)] shrink-0" data-node-id="I238:8143;226:4441;195:1591" data-name="Cart Count">
              <p className="[word-break:break-word] font-['JetBrains_Mono:Bold'] font-bold leading-[normal] relative shrink-0 text-[11px] text-[color:var(--base\/white,white)] whitespace-nowrap" data-node-id="I238:8143;226:4441;195:1592">
                2
              </p>
            </div>
          </div>
          <div className="bg-[var(--brand\/red,#ff6bd5)] content-stretch flex gap-[var(--spacing\/gap\/xsmall,8px)] h-[42px] items-center justify-center px-[var(--spacing\/padding\/large,20px)] relative rounded-[var(--radius\/luxury,12px)] shrink-0 w-[160px]" data-node-id="I238:8143;226:4449" data-name="Btn Nhận Báo Giá">
            <p className="[word-break:break-word] font-[family-name:var(--typography\/font-family\/button,'Inter:Semi_Bold')] font-[var(--emphasis\/font-weight\/bold,600)] leading-[var(--typography\/line-height\/button-label-l,20px)] not-italic relative shrink-0 text-[color:var(--base\/white,white)] text-[length:var(--typography\/font-size\/button-label-l,14px)] tracking-[var(--typography\/letter-spacing\/button-label-l,0px)] whitespace-nowrap" data-node-id="I238:8143;226:4449;148:70">
              NHẬN BÁO GIÁ
            </p>
            <div className="relative shrink-0 size-[16px]" data-node-id="I238:8143;226:4449;148:71" data-name="Trailing icon">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgTrailingIcon} />
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[var(--paper\/light,#f7f7f7)] border border-[var(--line\/default,rgba(1,1,1,0.13))] border-solid content-stretch flex gap-[var(--spacing\/gap\/xsmall,8px)] h-[52px] items-center overflow-clip p-[var(--spacing\/padding\/medium,16px)] relative shrink-0 w-full" data-node-id="238:8172" data-name="Breadcrumbs">
        <a className="[word-break:break-word] block cursor-pointer font-[family-name:var(--typography\/font-family\/sans,'Inter:Regular')] font-[var(--emphasis\/font-weight\/regular,400)] leading-[0] not-italic relative shrink-0 text-[color:var(--ink\/muted,rgba(0,0,0,0.69))] text-[length:var(--typography\/font-size\/body-base,14px)] tracking-[var(--typography\/letter-spacing\/body-base,-0.14px)] whitespace-nowrap" data-node-id="238:8173">
          <p className="leading-[var(--typography\/line-height\/body-base,20px)] whitespace-pre">{`Trang Chủ  /  Dịch Vụ`}</p>
        </a>
      </div>
      <div className="bg-[var(--brand\/red,#ff6bd5)] content-stretch flex flex-col gap-[var(--spacing\/gap\/small,12px)] items-start overflow-clip p-[var(--spacing\/padding\/4xlarge,48px)] relative shrink-0 w-full" data-node-id="238:8174" data-name="Category Hero Title">
        <div className="absolute bg-size-[200px_200px] bg-top-left inset-0" data-node-id="238:8175" style={{ backgroundImage: `url("${imgDecoPaperGrain}")` }} data-name="Deco · Paper grain" />
        <div className="absolute h-[648px] left-[-216px] mix-blend-multiply opacity-35 top-[-260px] w-[1296px]" data-node-id="238:8176" data-name="Deco · Halftone">
          <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgDecoHalftone} />
        </div>
        <div className="absolute h-[290.363px] left-[980px] opacity-20 top-[-20px] w-[420px]" data-node-id="238:8177" data-name="Deco · Khuôn QXS">
          <div className="absolute inset-[3.03%_2.09%_17.58%_2.09%]" data-node-id="I238:8177;180:1046" data-name="Group">
            <div className="absolute inset-[-0.26%_-0.15%]">
              <img alt="" className="block max-w-none size-full" src={imgGroup} />
            </div>
          </div>
        </div>
        <div className="absolute h-[450px] left-[-225px] opacity-12 top-[-168px] w-[900px]" data-node-id="238:8178" data-name="Deco · Halftone">
          <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgDecoHalftone} />
        </div>
        <p className="[word-break:break-word] font-['Be_Vietnam_Pro:ExtraBold'] leading-[var(--typography\/line-height\/display-3,48px)] not-italic relative shrink-0 text-[color:var(--base\/white,white)] text-[length:var(--typography\/font-size\/display-3,42px)] tracking-[var(--typography\/letter-spacing\/display-3,-1.14px)] whitespace-nowrap" data-node-id="238:8179">
          DỊCH VỤ XƯỞNG
        </p>
        <p className="[word-break:break-word] font-[family-name:var(--typography\/font-family\/sans,'Inter:Regular')] font-[var(--emphasis\/font-weight\/regular,400)] leading-[var(--typography\/line-height\/body-base,20px)] not-italic relative shrink-0 text-[color:var(--base\/white,white)] text-[length:var(--typography\/font-size\/body-base,14px)] tracking-[var(--typography\/letter-spacing\/body-base,-0.14px)] w-[1100px]" data-node-id="238:8180">
          Ngoài hộp Tết, xưởng còn làm nhãn mác và phụ liệu quanh năm cho ngành may và thực phẩm. Số lượng tối thiểu và giá tuỳ từng món.
        </p>
      </div>
      <div className="bg-[var(--paper\/light,#f7f7f7)] content-stretch flex flex-col gap-[28px] items-start overflow-clip px-[64px] py-[96px] relative shrink-0 w-full" data-node-id="238:8222" data-name="Danh Sách Dịch Vụ">
        <div className="absolute bg-size-[200px_200px] bg-top-left h-[5000px] left-0 top-0 w-[1440px]" data-node-id="238:8223" style={{ backgroundImage: `url("${imgDecoPaperGrain}")` }} data-name="Deco · Paper grain" />
        <div className="content-stretch flex gap-[10px] h-[20px] items-center relative shrink-0 w-full" data-node-id="238:8224" data-name="Deco/Dieline Divider">
          <div className="relative shrink-0 size-[16px]" data-node-id="I238:8224;158:579" data-name="Icon / scissors">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIconScissors} />
          </div>
          <div className="flex-[1_0_0] h-0 min-w-px relative" data-node-id="I238:8224;158:584" data-name="Line">
            <div className="absolute inset-[-1px_0_0_0]">
              <img alt="" className="block max-w-none size-full" src={imgLine} />
            </div>
          </div>
          <p className="[word-break:break-word] font-['JetBrains_Mono:Regular'] font-normal leading-[14px] relative shrink-0 text-[10px] text-[color:var(--brand\/red,#ff6bd5)] tracking-[0.6px] uppercase whitespace-nowrap" data-node-id="I238:8224;158:585">
            ĐƯỜNG BẾ · CẮT
          </p>
        </div>
        <div className="content-stretch flex flex-col gap-[24px] items-start overflow-clip relative shrink-0 w-full" data-node-id="238:8232" data-name="Lưới Dịch Vụ">
          <div className="content-stretch flex gap-[24px] items-start overflow-clip relative shrink-0 w-full" data-node-id="238:8246" data-name="Row">
            <div className="bg-[var(--base\/white,white)] border border-[var(--line\/default,rgba(1,1,1,0.13))] border-solid content-stretch flex flex-[1_0_0] flex-col items-start min-w-px overflow-clip relative rounded-[var(--radius\/luxury,12px)]" data-node-id="238:8233" data-name="Dịch Vụ Nhãn in satin, care label">
              <div className="h-[240px] relative shrink-0 w-full" data-node-id="238:8234" data-name="Ảnh Nhãn in satin, care label">
                <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgNhNhanInSatinCareLabel} />
              </div>
              <div className="content-stretch flex flex-col gap-[10px] items-start overflow-clip pb-[20px] pt-[18px] px-[20px] relative shrink-0 w-full" data-node-id="238:8235" data-name="Nội Dung">
                <p className="[word-break:break-word] font-[family-name:var(--typography\/font-family\/heading,'Lora:SemiBold')] font-[var(--emphasis\/font-weight\/bold,600)] leading-[var(--typography\/line-height\/subheading,26px)] min-w-full relative shrink-0 text-[color:var(--ink\/strong,#121212)] text-[length:var(--typography\/font-size\/subheading,19px)] tracking-[var(--typography\/letter-spacing\/subheading,-0.38px)] w-[min-content]" data-node-id="238:8236">
                  Nhãn in satin, care label
                </p>
                <p className="[word-break:break-word] font-[family-name:var(--typography\/font-family\/sans,'Inter:Regular')] font-[var(--emphasis\/font-weight\/regular,400)] leading-[var(--typography\/line-height\/body-small,16px)] min-w-full not-italic relative shrink-0 text-[color:var(--ink\/muted,rgba(0,0,0,0.69))] text-[length:var(--typography\/font-size\/body-small,12px)] tracking-[var(--typography\/letter-spacing\/body-small,0px)] w-[min-content]" data-node-id="238:8237">
                  Nhãn hướng dẫn giặt, nhãn thành phần, nhãn size in trên satin, ribbon, cotton. May vào cổ áo hoặc sườn áo.
                </p>
                <div className="relative shrink-0 size-px" data-node-id="238:8238" data-name="Spacer" />
                <div className="bg-[var(--base\/white,white)] border border-[var(--ink\/strong,#121212)] border-solid content-stretch flex gap-[var(--spacing\/gap\/xsmall,8px)] h-[36px] items-center justify-center px-[var(--spacing\/padding\/medium,16px)] relative rounded-[var(--radius\/luxury,12px)] shrink-0 w-full" data-node-id="238:8239" data-name="Btn Hỏi Giá Nhãn in satin, care label">
                  <p className="[word-break:break-word] font-[family-name:var(--typography\/font-family\/button,'Inter:Semi_Bold')] font-[var(--emphasis\/font-weight\/bold,600)] leading-[var(--typography\/line-height\/button-label-xs,12px)] not-italic relative shrink-0 text-[color:var(--ink\/strong,#121212)] text-[length:var(--typography\/font-size\/button-label-xs,12px)] tracking-[var(--typography\/letter-spacing\/button-label-xs,0px)] whitespace-nowrap" data-node-id="I238:8239;148:112">
                    HỎI GIÁ DỊCH VỤ NÀY
                  </p>
                  <div className="relative shrink-0 size-[16px]" data-node-id="I238:8239;148:113" data-name="Trailing icon">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgTrailingIcon1} />
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-[var(--base\/white,white)] border border-[var(--line\/default,rgba(1,1,1,0.13))] border-solid content-stretch flex flex-[1_0_0] flex-col items-start min-w-px overflow-clip relative rounded-[var(--radius\/luxury,12px)] self-stretch" data-node-id="238:8247" data-name="Dịch Vụ Nhãn dệt">
              <div className="h-[240px] relative shrink-0 w-full" data-node-id="238:8248" data-name="Ảnh Nhãn dệt">
                <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgNhNhanDt} />
              </div>
              <div className="content-stretch flex flex-[1_0_0] flex-col gap-[10px] items-start min-h-px overflow-clip pb-[20px] pt-[18px] px-[20px] relative w-full" data-node-id="238:8249" data-name="Nội Dung">
                <p className="[word-break:break-word] font-[family-name:var(--typography\/font-family\/heading,'Lora:SemiBold')] font-[var(--emphasis\/font-weight\/bold,600)] leading-[var(--typography\/line-height\/subheading,26px)] min-w-full relative shrink-0 text-[color:var(--ink\/strong,#121212)] text-[length:var(--typography\/font-size\/subheading,19px)] tracking-[var(--typography\/letter-spacing\/subheading,-0.38px)] w-[min-content]" data-node-id="238:8250">
                  Nhãn dệt
                </p>
                <p className="[word-break:break-word] font-[family-name:var(--typography\/font-family\/sans,'Inter:Regular')] font-[var(--emphasis\/font-weight\/regular,400)] leading-[var(--typography\/line-height\/body-small,16px)] min-w-full not-italic relative shrink-0 text-[color:var(--ink\/muted,rgba(0,0,0,0.69))] text-[length:var(--typography\/font-size\/body-small,12px)] tracking-[var(--typography\/letter-spacing\/body-small,0px)] w-[min-content]" data-node-id="238:8251">
                  Nhãn thương hiệu dệt chỉ cho ngành may. Bền, giặt nhiều không phai, hợp làm nhãn chính.
                </p>
                <div className="flex-[1_0_0] min-h-px relative w-px" data-node-id="238:8252" data-name="Spacer" />
                <div className="bg-[var(--base\/white,white)] border border-[var(--ink\/strong,#121212)] border-solid content-stretch flex gap-[var(--spacing\/gap\/xsmall,8px)] h-[36px] items-center justify-center px-[var(--spacing\/padding\/medium,16px)] relative rounded-[var(--radius\/luxury,12px)] shrink-0 w-full" data-node-id="238:8253" data-name="Btn Hỏi Giá Nhãn dệt">
                  <p className="[word-break:break-word] font-[family-name:var(--typography\/font-family\/button,'Inter:Semi_Bold')] font-[var(--emphasis\/font-weight\/bold,600)] leading-[var(--typography\/line-height\/button-label-xs,12px)] not-italic relative shrink-0 text-[color:var(--ink\/strong,#121212)] text-[length:var(--typography\/font-size\/button-label-xs,12px)] tracking-[var(--typography\/letter-spacing\/button-label-xs,0px)] whitespace-nowrap" data-node-id="I238:8253;148:112">
                    HỎI GIÁ DỊCH VỤ NÀY
                  </p>
                  <div className="relative shrink-0 size-[16px]" data-node-id="I238:8253;148:113" data-name="Trailing icon">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgTrailingIcon1} />
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-[var(--base\/white,white)] border border-[var(--line\/default,rgba(1,1,1,0.13))] border-solid content-stretch flex flex-[1_0_0] flex-col items-start min-w-px overflow-clip relative rounded-[var(--radius\/luxury,12px)] self-stretch" data-node-id="238:8259" data-name="Dịch Vụ Thẻ bài, hangtag">
              <div className="h-[240px] relative shrink-0 w-full" data-node-id="238:8260" data-name="Ảnh Thẻ bài, hangtag">
                <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgNhThBaiHangtag} />
              </div>
              <div className="content-stretch flex flex-[1_0_0] flex-col gap-[10px] items-start min-h-px overflow-clip pb-[20px] pt-[18px] px-[20px] relative w-full" data-node-id="238:8261" data-name="Nội Dung">
                <p className="[word-break:break-word] font-[family-name:var(--typography\/font-family\/heading,'Lora:SemiBold')] font-[var(--emphasis\/font-weight\/bold,600)] leading-[var(--typography\/line-height\/subheading,26px)] min-w-full relative shrink-0 text-[color:var(--ink\/strong,#121212)] text-[length:var(--typography\/font-size\/subheading,19px)] tracking-[var(--typography\/letter-spacing\/subheading,-0.38px)] w-[min-content]" data-node-id="238:8262">
                  Thẻ bài, hangtag
                </p>
                <p className="[word-break:break-word] font-[family-name:var(--typography\/font-family\/sans,'Inter:Regular')] font-[var(--emphasis\/font-weight\/regular,400)] leading-[var(--typography\/line-height\/body-small,16px)] min-w-full not-italic relative shrink-0 text-[color:var(--ink\/muted,rgba(0,0,0,0.69))] text-[length:var(--typography\/font-size\/body-small,12px)] tracking-[var(--typography\/letter-spacing\/body-small,0px)] w-[min-content]" data-node-id="238:8263">
                  Thẻ treo quần áo, thẻ tên, thẻ giá. Nhiều chất liệu giấy và nhựa, bế theo hình, xỏ dây sẵn nếu cần.
                </p>
                <div className="flex-[1_0_0] min-h-px relative w-px" data-node-id="238:8264" data-name="Spacer" />
                <div className="bg-[var(--base\/white,white)] border border-[var(--ink\/strong,#121212)] border-solid content-stretch flex gap-[var(--spacing\/gap\/xsmall,8px)] h-[36px] items-center justify-center px-[var(--spacing\/padding\/medium,16px)] relative rounded-[var(--radius\/luxury,12px)] shrink-0 w-full" data-node-id="238:8265" data-name="Btn Hỏi Giá Thẻ bài, hangtag">
                  <p className="[word-break:break-word] font-[family-name:var(--typography\/font-family\/button,'Inter:Semi_Bold')] font-[var(--emphasis\/font-weight\/bold,600)] leading-[var(--typography\/line-height\/button-label-xs,12px)] not-italic relative shrink-0 text-[color:var(--ink\/strong,#121212)] text-[length:var(--typography\/font-size\/button-label-xs,12px)] tracking-[var(--typography\/letter-spacing\/button-label-xs,0px)] whitespace-nowrap" data-node-id="I238:8265;148:112">
                    HỎI GIÁ DỊCH VỤ NÀY
                  </p>
                  <div className="relative shrink-0 size-[16px]" data-node-id="I238:8265;148:113" data-name="Trailing icon">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgTrailingIcon1} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="content-stretch flex gap-[24px] items-start overflow-clip relative shrink-0 w-full" data-node-id="238:8283" data-name="Row">
            <div className="bg-[var(--base\/white,white)] border border-[var(--line\/default,rgba(1,1,1,0.13))] border-solid content-stretch flex flex-[1_0_0] flex-col items-start min-w-px overflow-clip relative rounded-[var(--radius\/luxury,12px)]" data-node-id="238:8271" data-name="Dịch Vụ Ruy băng in">
              <div className="h-[240px] relative shrink-0 w-full" data-node-id="238:8272" data-name="Ảnh Ruy băng in">
                <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgNhRuyBangIn} />
              </div>
              <div className="content-stretch flex flex-col gap-[10px] items-start overflow-clip pb-[20px] pt-[18px] px-[20px] relative shrink-0 w-full" data-node-id="238:8273" data-name="Nội Dung">
                <p className="[word-break:break-word] font-[family-name:var(--typography\/font-family\/heading,'Lora:SemiBold')] font-[var(--emphasis\/font-weight\/bold,600)] leading-[var(--typography\/line-height\/subheading,26px)] min-w-full relative shrink-0 text-[color:var(--ink\/strong,#121212)] text-[length:var(--typography\/font-size\/subheading,19px)] tracking-[var(--typography\/letter-spacing\/subheading,-0.38px)] w-[min-content]" data-node-id="238:8274">
                  Ruy băng in
                </p>
                <p className="[word-break:break-word] font-[family-name:var(--typography\/font-family\/sans,'Inter:Regular')] font-[var(--emphasis\/font-weight\/regular,400)] leading-[var(--typography\/line-height\/body-small,16px)] min-w-full not-italic relative shrink-0 text-[color:var(--ink\/muted,rgba(0,0,0,0.69))] text-[length:var(--typography\/font-size\/body-small,12px)] tracking-[var(--typography\/letter-spacing\/body-small,0px)] w-[min-content]" data-node-id="238:8275">
                  Ruy băng in tên thương hiệu, lời chúc, tên cô dâu chú rể. Dùng buộc hộp quà, bó hoa, gói hàng.
                </p>
                <div className="relative shrink-0 size-px" data-node-id="238:8276" data-name="Spacer" />
                <div className="bg-[var(--base\/white,white)] border border-[var(--ink\/strong,#121212)] border-solid content-stretch flex gap-[var(--spacing\/gap\/xsmall,8px)] h-[36px] items-center justify-center px-[var(--spacing\/padding\/medium,16px)] relative rounded-[var(--radius\/luxury,12px)] shrink-0 w-full" data-node-id="238:8277" data-name="Btn Hỏi Giá Ruy băng in">
                  <p className="[word-break:break-word] font-[family-name:var(--typography\/font-family\/button,'Inter:Semi_Bold')] font-[var(--emphasis\/font-weight\/bold,600)] leading-[var(--typography\/line-height\/button-label-xs,12px)] not-italic relative shrink-0 text-[color:var(--ink\/strong,#121212)] text-[length:var(--typography\/font-size\/button-label-xs,12px)] tracking-[var(--typography\/letter-spacing\/button-label-xs,0px)] whitespace-nowrap" data-node-id="I238:8277;148:112">
                    HỎI GIÁ DỊCH VỤ NÀY
                  </p>
                  <div className="relative shrink-0 size-[16px]" data-node-id="I238:8277;148:113" data-name="Trailing icon">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgTrailingIcon1} />
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-[var(--base\/white,white)] border border-[var(--line\/default,rgba(1,1,1,0.13))] border-solid content-stretch flex flex-[1_0_0] flex-col items-start min-w-px overflow-clip relative rounded-[var(--radius\/luxury,12px)] self-stretch" data-node-id="238:8284" data-name="Dịch Vụ Nhãn ép nhiệt">
              <div className="bg-[#f4f1ea] content-stretch flex flex-col gap-[10px] h-[240px] items-center justify-center overflow-clip relative shrink-0 w-full" data-node-id="238:10297" data-name="Ô Hoạ Tiết Nhãn ép nhiệt">
                <div className="absolute h-[400px] left-[-40px] opacity-22 top-[80px] w-[800px]" data-node-id="238:10298" data-name="Deco/Halftone">
                  <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgDecoHalftone} />
                </div>
                <div className="absolute h-[200px] left-[20px] top-[20px] w-[379.333px]" data-node-id="238:10299" data-name="Deco/Crop Marks">
                  <div className="absolute bg-[var(--ink\/strong,#121212)] h-[0.75px] left-[-28px] top-0 w-[18px]" data-node-id="I238:10299;158:539" data-name="Rectangle" />
                  <div className="absolute bg-[var(--ink\/strong,#121212)] h-[18px] left-0 top-[-28px] w-[0.75px]" data-node-id="I238:10299;158:540" data-name="Rectangle" />
                  <div className="absolute bg-[var(--ink\/strong,#121212)] h-[0.75px] right-[-28px] top-0 w-[18px]" data-node-id="I238:10299;158:541" data-name="Rectangle" />
                  <div className="absolute bg-[var(--ink\/strong,#121212)] h-[18px] right-0 top-[-28px] w-[0.75px]" data-node-id="I238:10299;158:542" data-name="Rectangle" />
                  <div className="absolute bg-[var(--ink\/strong,#121212)] bottom-0 h-[0.75px] left-[-28px] w-[18px]" data-node-id="I238:10299;158:543" data-name="Rectangle" />
                  <div className="absolute bg-[var(--ink\/strong,#121212)] bottom-[-28px] h-[18px] left-0 w-[0.75px]" data-node-id="I238:10299;158:544" data-name="Rectangle" />
                  <div className="absolute bg-[var(--ink\/strong,#121212)] bottom-0 h-[0.75px] right-[-28px] w-[18px]" data-node-id="I238:10299;158:545" data-name="Rectangle" />
                  <div className="absolute bg-[var(--ink\/strong,#121212)] bottom-[-28px] h-[18px] right-0 w-[0.75px]" data-node-id="I238:10299;158:546" data-name="Rectangle" />
                </div>
                <div className="relative shrink-0 size-[40px]" data-node-id="238:10308" data-name="Icon/box">
                  <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIconBox} />
                </div>
                <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[11px] text-[color:var(--ink\/muted,rgba(0,0,0,0.69))] tracking-[0.88px] whitespace-nowrap" data-node-id="238:10311">
                  ẢNH ĐANG CẬP NHẬT
                </p>
              </div>
              <div className="content-stretch flex flex-[1_0_0] flex-col gap-[10px] items-start min-h-px overflow-clip pb-[20px] pt-[18px] px-[20px] relative w-full" data-node-id="238:8286" data-name="Nội Dung">
                <p className="[word-break:break-word] font-[family-name:var(--typography\/font-family\/heading,'Lora:SemiBold')] font-[var(--emphasis\/font-weight\/bold,600)] leading-[var(--typography\/line-height\/subheading,26px)] min-w-full relative shrink-0 text-[color:var(--ink\/strong,#121212)] text-[length:var(--typography\/font-size\/subheading,19px)] tracking-[var(--typography\/letter-spacing\/subheading,-0.38px)] w-[min-content]" data-node-id="238:8287">
                  Nhãn ép nhiệt
                </p>
                <p className="[word-break:break-word] font-[family-name:var(--typography\/font-family\/sans,'Inter:Regular')] font-[var(--emphasis\/font-weight\/regular,400)] leading-[var(--typography\/line-height\/body-small,16px)] min-w-full not-italic relative shrink-0 text-[color:var(--ink\/muted,rgba(0,0,0,0.69))] text-[length:var(--typography\/font-size\/body-small,12px)] tracking-[var(--typography\/letter-spacing\/body-small,0px)] w-[min-content]" data-node-id="238:8288">
                  Nhãn ép thẳng lên vải thay cho nhãn may. Không cộm cổ, hợp áo thun và đồ thể thao.
                </p>
                <div className="flex-[1_0_0] min-h-px relative w-px" data-node-id="238:8289" data-name="Spacer" />
                <div className="bg-[var(--base\/white,white)] border border-[var(--ink\/strong,#121212)] border-solid content-stretch flex gap-[var(--spacing\/gap\/xsmall,8px)] h-[36px] items-center justify-center px-[var(--spacing\/padding\/medium,16px)] relative rounded-[var(--radius\/luxury,12px)] shrink-0 w-full" data-node-id="238:8290" data-name="Btn Hỏi Giá Nhãn ép nhiệt">
                  <p className="[word-break:break-word] font-[family-name:var(--typography\/font-family\/button,'Inter:Semi_Bold')] font-[var(--emphasis\/font-weight\/bold,600)] leading-[var(--typography\/line-height\/button-label-xs,12px)] not-italic relative shrink-0 text-[color:var(--ink\/strong,#121212)] text-[length:var(--typography\/font-size\/button-label-xs,12px)] tracking-[var(--typography\/letter-spacing\/button-label-xs,0px)] whitespace-nowrap" data-node-id="I238:8290;148:112">
                    HỎI GIÁ DỊCH VỤ NÀY
                  </p>
                  <div className="relative shrink-0 size-[16px]" data-node-id="I238:8290;148:113" data-name="Trailing icon">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgTrailingIcon1} />
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-[var(--base\/white,white)] border border-[var(--line\/default,rgba(1,1,1,0.13))] border-solid content-stretch flex flex-[1_0_0] flex-col items-start min-w-px overflow-clip relative rounded-[var(--radius\/luxury,12px)] self-stretch" data-node-id="238:8296" data-name="Dịch Vụ Tem dán, decal">
              <div className="h-[240px] relative shrink-0 w-full" data-node-id="238:8297" data-name="Ảnh Tem dán, decal">
                <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgNhTemDanDecal} />
              </div>
              <div className="content-stretch flex flex-[1_0_0] flex-col gap-[10px] items-start min-h-px overflow-clip pb-[20px] pt-[18px] px-[20px] relative w-full" data-node-id="238:8298" data-name="Nội Dung">
                <p className="[word-break:break-word] font-[family-name:var(--typography\/font-family\/heading,'Lora:SemiBold')] font-[var(--emphasis\/font-weight\/bold,600)] leading-[var(--typography\/line-height\/subheading,26px)] min-w-full relative shrink-0 text-[color:var(--ink\/strong,#121212)] text-[length:var(--typography\/font-size\/subheading,19px)] tracking-[var(--typography\/letter-spacing\/subheading,-0.38px)] w-[min-content]" data-node-id="238:8299">
                  Tem dán, decal
                </p>
                <p className="[word-break:break-word] font-[family-name:var(--typography\/font-family\/sans,'Inter:Regular')] font-[var(--emphasis\/font-weight\/regular,400)] leading-[var(--typography\/line-height\/body-small,16px)] min-w-full not-italic relative shrink-0 text-[color:var(--ink\/muted,rgba(0,0,0,0.69))] text-[length:var(--typography\/font-size\/body-small,12px)] tracking-[var(--typography\/letter-spacing\/body-small,0px)] w-[min-content]" data-node-id="238:8300">
                  Tem chai lọ, tem bao bì, tem thông số, tem niêm phong. In gom bài nên số lượng ít vẫn có giá tốt.
                </p>
                <div className="flex-[1_0_0] min-h-px relative w-px" data-node-id="238:8301" data-name="Spacer" />
                <div className="bg-[var(--base\/white,white)] border border-[var(--ink\/strong,#121212)] border-solid content-stretch flex gap-[var(--spacing\/gap\/xsmall,8px)] h-[36px] items-center justify-center px-[var(--spacing\/padding\/medium,16px)] relative rounded-[var(--radius\/luxury,12px)] shrink-0 w-full" data-node-id="238:8302" data-name="Btn Hỏi Giá Tem dán, decal">
                  <p className="[word-break:break-word] font-[family-name:var(--typography\/font-family\/button,'Inter:Semi_Bold')] font-[var(--emphasis\/font-weight\/bold,600)] leading-[var(--typography\/line-height\/button-label-xs,12px)] not-italic relative shrink-0 text-[color:var(--ink\/strong,#121212)] text-[length:var(--typography\/font-size\/button-label-xs,12px)] tracking-[var(--typography\/letter-spacing\/button-label-xs,0px)] whitespace-nowrap" data-node-id="I238:8302;148:112">
                    HỎI GIÁ DỊCH VỤ NÀY
                  </p>
                  <div className="relative shrink-0 size-[16px]" data-node-id="I238:8302;148:113" data-name="Trailing icon">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgTrailingIcon1} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="content-stretch flex gap-[24px] items-start overflow-clip relative shrink-0 w-full" data-node-id="238:8320" data-name="Row">
            <div className="bg-[var(--base\/white,white)] border border-[var(--line\/default,rgba(1,1,1,0.13))] border-solid content-stretch flex flex-[1_0_0] flex-col items-start min-w-px overflow-clip relative rounded-[var(--radius\/luxury,12px)]" data-node-id="238:8308" data-name="Dịch Vụ Hộp giấy theo yêu cầu">
              <div className="h-[240px] relative shrink-0 w-full" data-node-id="238:8309" data-name="Ảnh Hộp giấy theo yêu cầu">
                <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgNhHpGiyTheoYeuCu} />
              </div>
              <div className="content-stretch flex flex-col gap-[10px] items-start overflow-clip pb-[20px] pt-[18px] px-[20px] relative shrink-0 w-full" data-node-id="238:8310" data-name="Nội Dung">
                <p className="[word-break:break-word] font-[family-name:var(--typography\/font-family\/heading,'Lora:SemiBold')] font-[var(--emphasis\/font-weight\/bold,600)] leading-[var(--typography\/line-height\/subheading,26px)] min-w-full relative shrink-0 text-[color:var(--ink\/strong,#121212)] text-[length:var(--typography\/font-size\/subheading,19px)] tracking-[var(--typography\/letter-spacing\/subheading,-0.38px)] w-[min-content]" data-node-id="238:8311">
                  Hộp giấy theo yêu cầu
                </p>
                <p className="[word-break:break-word] font-[family-name:var(--typography\/font-family\/sans,'Inter:Regular')] font-[var(--emphasis\/font-weight\/regular,400)] leading-[var(--typography\/line-height\/body-small,16px)] min-w-full not-italic relative shrink-0 text-[color:var(--ink\/muted,rgba(0,0,0,0.69))] text-[length:var(--typography\/font-size\/body-small,12px)] tracking-[var(--typography\/letter-spacing\/body-small,0px)] w-[min-content]" data-node-id="238:8312">
                  Ngoài 21 mẫu có sẵn thiết kế, xưởng nhận làm hộp theo kích thước riêng của bạn. Có phí khuôn, khuôn lưu lại cho đơn sau.
                </p>
                <div className="relative shrink-0 size-px" data-node-id="238:8313" data-name="Spacer" />
                <div className="bg-[var(--base\/white,white)] border border-[var(--ink\/strong,#121212)] border-solid content-stretch flex gap-[var(--spacing\/gap\/xsmall,8px)] h-[36px] items-center justify-center px-[var(--spacing\/padding\/medium,16px)] relative rounded-[var(--radius\/luxury,12px)] shrink-0 w-full" data-node-id="238:8314" data-name="Btn Hỏi Giá Hộp giấy theo yêu cầu">
                  <p className="[word-break:break-word] font-[family-name:var(--typography\/font-family\/button,'Inter:Semi_Bold')] font-[var(--emphasis\/font-weight\/bold,600)] leading-[var(--typography\/line-height\/button-label-xs,12px)] not-italic relative shrink-0 text-[color:var(--ink\/strong,#121212)] text-[length:var(--typography\/font-size\/button-label-xs,12px)] tracking-[var(--typography\/letter-spacing\/button-label-xs,0px)] whitespace-nowrap" data-node-id="I238:8314;148:112">
                    HỎI GIÁ DỊCH VỤ NÀY
                  </p>
                  <div className="relative shrink-0 size-[16px]" data-node-id="I238:8314;148:113" data-name="Trailing icon">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgTrailingIcon1} />
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-[var(--base\/white,white)] border border-[var(--line\/default,rgba(1,1,1,0.13))] border-solid content-stretch flex flex-[1_0_0] flex-col items-start min-w-px overflow-clip relative rounded-[var(--radius\/luxury,12px)] self-stretch" data-node-id="238:8321" data-name="Dịch Vụ Giấy cuộn bó hàng">
              <div className="bg-[#f4f1ea] content-stretch flex flex-col gap-[10px] h-[240px] items-center justify-center overflow-clip relative shrink-0 w-full" data-node-id="238:10312" data-name="Ô Hoạ Tiết Giấy cuộn bó hàng">
                <div className="absolute h-[400px] left-[-40px] opacity-22 top-[80px] w-[800px]" data-node-id="238:10313" data-name="Deco/Halftone">
                  <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgDecoHalftone} />
                </div>
                <div className="absolute h-[200px] left-[20px] top-[20px] w-[379.333px]" data-node-id="238:10314" data-name="Deco/Crop Marks">
                  <div className="absolute bg-[var(--ink\/strong,#121212)] h-[0.75px] left-[-28px] top-0 w-[18px]" data-node-id="I238:10314;158:539" data-name="Rectangle" />
                  <div className="absolute bg-[var(--ink\/strong,#121212)] h-[18px] left-0 top-[-28px] w-[0.75px]" data-node-id="I238:10314;158:540" data-name="Rectangle" />
                  <div className="absolute bg-[var(--ink\/strong,#121212)] h-[0.75px] right-[-28px] top-0 w-[18px]" data-node-id="I238:10314;158:541" data-name="Rectangle" />
                  <div className="absolute bg-[var(--ink\/strong,#121212)] h-[18px] right-0 top-[-28px] w-[0.75px]" data-node-id="I238:10314;158:542" data-name="Rectangle" />
                  <div className="absolute bg-[var(--ink\/strong,#121212)] bottom-0 h-[0.75px] left-[-28px] w-[18px]" data-node-id="I238:10314;158:543" data-name="Rectangle" />
                  <div className="absolute bg-[var(--ink\/strong,#121212)] bottom-[-28px] h-[18px] left-0 w-[0.75px]" data-node-id="I238:10314;158:544" data-name="Rectangle" />
                  <div className="absolute bg-[var(--ink\/strong,#121212)] bottom-0 h-[0.75px] right-[-28px] w-[18px]" data-node-id="I238:10314;158:545" data-name="Rectangle" />
                  <div className="absolute bg-[var(--ink\/strong,#121212)] bottom-[-28px] h-[18px] right-0 w-[0.75px]" data-node-id="I238:10314;158:546" data-name="Rectangle" />
                </div>
                <div className="relative shrink-0 size-[40px]" data-node-id="238:10323" data-name="Icon/box">
                  <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIconBox} />
                </div>
                <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[11px] text-[color:var(--ink\/muted,rgba(0,0,0,0.69))] tracking-[0.88px] whitespace-nowrap" data-node-id="238:10326">
                  ẢNH ĐANG CẬP NHẬT
                </p>
              </div>
              <div className="content-stretch flex flex-[1_0_0] flex-col gap-[10px] items-start min-h-px overflow-clip pb-[20px] pt-[18px] px-[20px] relative w-full" data-node-id="238:8323" data-name="Nội Dung">
                <p className="[word-break:break-word] font-[family-name:var(--typography\/font-family\/heading,'Lora:SemiBold')] font-[var(--emphasis\/font-weight\/bold,600)] leading-[var(--typography\/line-height\/subheading,26px)] min-w-full relative shrink-0 text-[color:var(--ink\/strong,#121212)] text-[length:var(--typography\/font-size\/subheading,19px)] tracking-[var(--typography\/letter-spacing\/subheading,-0.38px)] w-[min-content]" data-node-id="238:8324">
                  Giấy cuộn bó hàng
                </p>
                <p className="[word-break:break-word] font-[family-name:var(--typography\/font-family\/sans,'Inter:Regular')] font-[var(--emphasis\/font-weight\/regular,400)] leading-[var(--typography\/line-height\/body-small,16px)] min-w-full not-italic relative shrink-0 text-[color:var(--ink\/muted,rgba(0,0,0,0.69))] text-[length:var(--typography\/font-size\/body-small,12px)] tracking-[var(--typography\/letter-spacing\/body-small,0px)] w-[min-content]" data-node-id="238:8325">
                  Giấy in cuộn để bó, gói hàng cho xưởng may và shop thời trang.
                </p>
                <div className="flex-[1_0_0] min-h-px relative w-px" data-node-id="238:8326" data-name="Spacer" />
                <div className="bg-[var(--base\/white,white)] border border-[var(--ink\/strong,#121212)] border-solid content-stretch flex gap-[var(--spacing\/gap\/xsmall,8px)] h-[36px] items-center justify-center px-[var(--spacing\/padding\/medium,16px)] relative rounded-[var(--radius\/luxury,12px)] shrink-0 w-full" data-node-id="238:8327" data-name="Btn Hỏi Giá Giấy cuộn bó hàng">
                  <p className="[word-break:break-word] font-[family-name:var(--typography\/font-family\/button,'Inter:Semi_Bold')] font-[var(--emphasis\/font-weight\/bold,600)] leading-[var(--typography\/line-height\/button-label-xs,12px)] not-italic relative shrink-0 text-[color:var(--ink\/strong,#121212)] text-[length:var(--typography\/font-size\/button-label-xs,12px)] tracking-[var(--typography\/letter-spacing\/button-label-xs,0px)] whitespace-nowrap" data-node-id="I238:8327;148:112">
                    HỎI GIÁ DỊCH VỤ NÀY
                  </p>
                  <div className="relative shrink-0 size-[16px]" data-node-id="I238:8327;148:113" data-name="Trailing icon">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgTrailingIcon1} />
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-[var(--base\/white,white)] border border-[var(--line\/default,rgba(1,1,1,0.13))] border-solid content-stretch flex flex-[1_0_0] flex-col items-start min-w-px overflow-clip relative rounded-[var(--radius\/luxury,12px)] self-stretch" data-node-id="238:8333" data-name="Dịch Vụ Phụ liệu may">
              <div className="h-[240px] relative shrink-0 w-full" data-node-id="238:8334" data-name="Ảnh Phụ liệu may">
                <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgNhPhLiuMay} />
              </div>
              <div className="content-stretch flex flex-[1_0_0] flex-col gap-[10px] items-start min-h-px overflow-clip pb-[20px] pt-[18px] px-[20px] relative w-full" data-node-id="238:8335" data-name="Nội Dung">
                <p className="[word-break:break-word] font-[family-name:var(--typography\/font-family\/heading,'Lora:SemiBold')] font-[var(--emphasis\/font-weight\/bold,600)] leading-[var(--typography\/line-height\/subheading,26px)] min-w-full relative shrink-0 text-[color:var(--ink\/strong,#121212)] text-[length:var(--typography\/font-size\/subheading,19px)] tracking-[var(--typography\/letter-spacing\/subheading,-0.38px)] w-[min-content]" data-node-id="238:8336">
                  Phụ liệu may
                </p>
                <p className="[word-break:break-word] font-[family-name:var(--typography\/font-family\/sans,'Inter:Regular')] font-[var(--emphasis\/font-weight\/regular,400)] leading-[var(--typography\/line-height\/body-small,16px)] min-w-full not-italic relative shrink-0 text-[color:var(--ink\/muted,rgba(0,0,0,0.69))] text-[length:var(--typography\/font-size\/body-small,12px)] tracking-[var(--typography\/letter-spacing\/body-small,0px)] w-[min-content]" data-node-id="238:8337">
                  Kim băng, dây treo thẻ bài, đạn nhựa, kẹp áo, giấy lót cổ, gói hút ẩm. Đặt chung với nhãn mác cho gọn một mối.
                </p>
                <div className="flex-[1_0_0] min-h-px relative w-px" data-node-id="238:8338" data-name="Spacer" />
                <div className="bg-[var(--base\/white,white)] border border-[var(--ink\/strong,#121212)] border-solid content-stretch flex gap-[var(--spacing\/gap\/xsmall,8px)] h-[36px] items-center justify-center px-[var(--spacing\/padding\/medium,16px)] relative rounded-[var(--radius\/luxury,12px)] shrink-0 w-full" data-node-id="238:8339" data-name="Btn Hỏi Giá Phụ liệu may">
                  <p className="[word-break:break-word] font-[family-name:var(--typography\/font-family\/button,'Inter:Semi_Bold')] font-[var(--emphasis\/font-weight\/bold,600)] leading-[var(--typography\/line-height\/button-label-xs,12px)] not-italic relative shrink-0 text-[color:var(--ink\/strong,#121212)] text-[length:var(--typography\/font-size\/button-label-xs,12px)] tracking-[var(--typography\/letter-spacing\/button-label-xs,0px)] whitespace-nowrap" data-node-id="I238:8339;148:112">
                    HỎI GIÁ DỊCH VỤ NÀY
                  </p>
                  <div className="relative shrink-0 size-[16px]" data-node-id="I238:8339;148:113" data-name="Trailing icon">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgTrailingIcon1} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <p className="[word-break:break-word] font-[family-name:var(--typography\/font-family\/sans,'Inter:Regular')] font-[var(--emphasis\/font-weight\/regular,400)] leading-[var(--typography\/line-height\/body-small,16px)] min-w-full not-italic relative shrink-0 text-[color:var(--ink\/muted,rgba(0,0,0,0.69))] text-[length:var(--typography\/font-size\/body-small,12px)] tracking-[var(--typography\/letter-spacing\/body-small,0px)] w-[min-content]" data-node-id="238:8345">
          Ảnh ở trang này là hàng xưởng đã làm cho khách, dùng để minh hoạ chất liệu và kiểu in.
        </p>
      </div>
      <div className="bg-[var(--brand\/red,#ff6bd5)] content-stretch flex items-center justify-between overflow-clip px-[64px] py-[48px] relative shrink-0 w-full" data-node-id="238:8346" data-name="Dải Kêu Gọi Báo Giá">
        <div className="absolute h-[400px] left-[1020px] opacity-18 top-[-60px] w-[800px]" data-node-id="238:8347" data-name="Deco/Halftone">
          <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgDecoHalftone} />
        </div>
        <div className="[word-break:break-word] content-stretch flex flex-col gap-[6px] items-start overflow-clip relative shrink-0 text-[color:var(--base\/white,white)] whitespace-nowrap" data-node-id="238:8348" data-name="CTA Text">
          <p className="font-['Inter:Semi_Bold'] font-semibold leading-[16px] not-italic relative shrink-0 text-[11px] tracking-[0.66px] uppercase" data-node-id="238:8349">
            ĐẶT THEO SET 100 · IN LOGO RIÊNG
          </p>
          <p className="font-[family-name:var(--typography\/font-family\/heading,'Lora:SemiBold')] font-[var(--emphasis\/font-weight\/bold,600)] leading-[var(--typography\/line-height\/heading-3,32px)] relative shrink-0 text-[length:var(--typography\/font-size\/heading-3,26px)] tracking-[var(--typography\/letter-spacing\/heading-3,-0.52px)]" data-node-id="238:8350">
            Nhắn GÓI món bạn bán, nhận báo giá và maket
          </p>
        </div>
        <div className="content-stretch flex gap-[12px] items-start overflow-clip relative shrink-0" data-node-id="238:8351" data-name="CTA Buttons">
          <div className="bg-[var(--ink\/strong,#121212)] content-stretch flex gap-[var(--spacing\/gap\/xsmall,8px)] h-[48px] items-center justify-center px-[var(--spacing\/padding\/xlarge,24px)] relative rounded-[var(--radius\/luxury,12px)] shrink-0" data-node-id="238:8352" data-name="Btn Nhận Báo Giá">
            <p className="[word-break:break-word] font-[family-name:var(--typography\/font-family\/button,'Inter:Semi_Bold')] font-[var(--emphasis\/font-weight\/bold,600)] leading-[var(--typography\/line-height\/button-label-l,20px)] not-italic relative shrink-0 text-[color:var(--base\/white,white)] text-[length:var(--typography\/font-size\/button-label-l,14px)] tracking-[var(--typography\/letter-spacing\/button-label-l,0px)] whitespace-nowrap" data-node-id="I238:8352;148:82">
              NHẬN BÁO GIÁ NHANH
            </p>
            <div className="relative shrink-0 size-[16px]" data-node-id="I238:8352;148:83" data-name="Trailing icon">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgTrailingIcon} />
            </div>
          </div>
          <div className="bg-white border border-[var(--ink\/strong,#121212)] border-solid content-stretch flex gap-[var(--spacing\/gap\/xsmall,8px)] h-[48px] items-center justify-center px-[var(--spacing\/padding\/xlarge,24px)] relative rounded-[var(--radius\/luxury,12px)] shrink-0" data-node-id="238:8359" data-name="Btn Chat Zalo">
            <p className="[word-break:break-word] font-[family-name:var(--typography\/font-family\/button,'Inter:Semi_Bold')] font-[var(--emphasis\/font-weight\/bold,600)] leading-[var(--typography\/line-height\/button-label-l,20px)] not-italic relative shrink-0 text-[color:var(--ink\/strong,#121212)] text-[length:var(--typography\/font-size\/button-label-l,14px)] tracking-[var(--typography\/letter-spacing\/button-label-l,0px)] whitespace-nowrap" data-node-id="I238:8359;148:100">
              CHAT ZALO VỚI XƯỞNG
            </p>
            <div className="relative shrink-0 size-[16px]" data-node-id="I238:8359;148:101" data-name="Trailing icon">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgTrailingIcon1} />
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#1e140e] h-[760px] overflow-clip relative shrink-0 w-full" data-node-id="238:8366" data-name="Footer">
        <DecoHalftone className="absolute flex h-[450px] items-center justify-center left-[660px] top-[310px] w-[900px]" />
        <div className="absolute h-[287.117px] left-[900px] opacity-5 top-[420px] w-[520px]" data-node-id="I238:8366;217:2802" data-name="Deco · Watermark GÓI">
          <p className="[word-break:break-word] absolute font-['Lora:SemiBold'] font-semibold inset-0 leading-none text-[360px] text-[transparent] tracking-[-14.4px] whitespace-nowrap" data-node-id="I238:8366;217:2802;181:1050">
            GÓI
          </p>
        </div>
        <p className="[word-break:break-word] absolute font-[family-name:var(--typography\/font-family\/heading,'Lora:SemiBold')] font-[var(--emphasis\/font-weight\/bold,600)] leading-[var(--typography\/line-height\/heading-2,38px)] left-[64px] text-[color:var(--base\/white,white)] text-[length:var(--typography\/font-size\/heading-2,30px)] top-[48px] tracking-[var(--typography\/letter-spacing\/heading-2,-0.6px)] whitespace-nowrap" data-node-id="I238:8366;217:2803">
          GÓI
        </p>
        <p className="[word-break:break-word] absolute font-['Inter:Semi_Bold'] font-semibold leading-[16px] left-[64px] not-italic text-[11px] text-[color:var(--brand\/gold-foil,#a67c2e)] top-[84px] tracking-[0.66px] uppercase whitespace-nowrap" data-node-id="I238:8366;217:2804">
          XƯỞNG BAO BÌ GIẤY TRỰC TIẾP TP.HCM
        </p>
        <p className="[word-break:break-word] absolute font-[family-name:var(--typography\/font-family\/sans,'Inter:Regular')] font-[var(--emphasis\/font-weight\/regular,400)] h-[75px] leading-[var(--typography\/line-height\/body-base,20px)] left-[64px] not-italic text-[color:var(--base\/white,white)] text-[length:var(--typography\/font-size\/body-base,14px)] top-[110px] tracking-[var(--typography\/letter-spacing\/body-base,-0.14px)] w-[280px]" data-node-id="I238:8366;217:2805">
          GÓI - bao bì Tết in logo thương hiệu riêng, đặt theo set 100 sản phẩm. In trực tiếp tại xưởng Quận 12, TP.HCM.
        </p>
        <div className="absolute bg-[#1877f2] content-stretch flex items-center justify-center left-[64px] overflow-clip rounded-[var(--radius\/luxury,12px)] size-[36px] top-[203px]" data-node-id="I238:8366;217:2806" data-name="Social FB">
          <div className="relative shrink-0 size-[16px]" data-node-id="I238:8366;217:2807" data-name="Icon/facebook">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIconFacebook} />
          </div>
        </div>
        <div className="absolute bg-[red] content-stretch flex items-center justify-center left-[110px] overflow-clip rounded-[var(--radius\/luxury,12px)] size-[36px] top-[203px]" data-node-id="I238:8366;217:2808" data-name="Social YT">
          <div className="relative shrink-0 size-[16px]" data-node-id="I238:8366;217:2809" data-name="Icon/youtube">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIconYoutube} />
          </div>
        </div>
        <div className="absolute bg-black border border-[rgba(255,255,255,0.5)] border-solid content-stretch flex items-center justify-center left-[156px] overflow-clip rounded-[var(--radius\/luxury,12px)] size-[36px] top-[203px]" data-node-id="I238:8366;217:2810" data-name="Social TT">
          <div className="relative shrink-0 size-[16px]" data-node-id="I238:8366;217:2811" data-name="Icon/tiktok">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIconTiktok} />
          </div>
        </div>
        <div className="absolute bg-[#0068ff] content-stretch flex items-center justify-center left-[202px] overflow-clip rounded-[var(--radius\/luxury,12px)] size-[36px] top-[203px]" data-node-id="I238:8366;217:2812" data-name="Social ZL">
          <div className="relative shrink-0 size-[16px]" data-node-id="I238:8366;217:2813" data-name="Icon/chat">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIconChat} />
          </div>
        </div>
        <p className="[word-break:break-word] absolute font-[family-name:var(--typography\/font-family\/sans,'Inter:Semi_Bold')] font-[var(--emphasis\/font-weight\/bold,600)] leading-[var(--typography\/line-height\/body-base,20px)] left-[394px] not-italic text-[color:var(--base\/white,white)] text-[length:var(--typography\/font-size\/body-base,14px)] top-[48px] tracking-[var(--typography\/letter-spacing\/body-base,-0.14px)] whitespace-nowrap" data-node-id="I238:8366;217:2814">
          Sản phẩm
        </p>
        <p className="[word-break:break-word] absolute font-[family-name:var(--typography\/font-family\/sans,'Inter:Regular')] font-[var(--emphasis\/font-weight\/regular,400)] leading-[var(--typography\/line-height\/body-base,20px)] left-[394px] not-italic text-[color:var(--base\/white,white)] text-[length:var(--typography\/font-size\/body-base,14px)] top-[84px] tracking-[var(--typography\/letter-spacing\/body-base,-0.14px)] whitespace-nowrap" data-node-id="I238:8366;217:2815">
          Hộp cứng cao cấp (Âm dương, Nam châm)
        </p>
        <p className="[word-break:break-word] absolute font-[family-name:var(--typography\/font-family\/sans,'Inter:Regular')] font-[var(--emphasis\/font-weight\/regular,400)] leading-[var(--typography\/line-height\/body-base,20px)] left-[394px] not-italic text-[color:var(--base\/white,white)] text-[length:var(--typography\/font-size\/body-base,14px)] top-[110px] tracking-[var(--typography\/letter-spacing\/body-base,-0.14px)] whitespace-nowrap" data-node-id="I238:8366;217:2816">{`Túi giấy Boutique & Sự kiện`}</p>
        <p className="[word-break:break-word] absolute font-[family-name:var(--typography\/font-family\/sans,'Inter:Regular')] font-[var(--emphasis\/font-weight\/regular,400)] leading-[var(--typography\/line-height\/body-base,20px)] left-[394px] not-italic text-[color:var(--base\/white,white)] text-[length:var(--typography\/font-size\/body-base,14px)] top-[136px] tracking-[var(--typography\/letter-spacing\/body-base,-0.14px)] whitespace-nowrap" data-node-id="I238:8366;217:2817">
          Hộp giấy mềm (Ivory, Kraft gấp)
        </p>
        <p className="[word-break:break-word] absolute font-[family-name:var(--typography\/font-family\/sans,'Inter:Regular')] font-[var(--emphasis\/font-weight\/regular,400)] leading-[var(--typography\/line-height\/body-base,20px)] left-[394px] not-italic text-[color:var(--base\/white,white)] text-[length:var(--typography\/font-size\/body-base,14px)] top-[162px] tracking-[var(--typography\/letter-spacing\/body-base,-0.14px)] whitespace-nowrap" data-node-id="I238:8366;217:2818">
          Hộp carton sóng ship COD
        </p>
        <p className="[word-break:break-word] absolute font-[family-name:var(--typography\/font-family\/sans,'Inter:Regular')] font-[var(--emphasis\/font-weight\/regular,400)] leading-[var(--typography\/line-height\/body-base,20px)] left-[394px] not-italic text-[color:var(--base\/white,white)] text-[length:var(--typography\/font-size\/body-base,14px)] top-[188px] tracking-[var(--typography\/letter-spacing\/body-base,-0.14px)] whitespace-nowrap" data-node-id="I238:8366;217:2819">
          Thùng carton in Flexo / Offset
        </p>
        <p className="[word-break:break-word] absolute font-[family-name:var(--typography\/font-family\/sans,'Inter:Regular')] font-[var(--emphasis\/font-weight\/regular,400)] leading-[var(--typography\/line-height\/body-base,20px)] left-[394px] not-italic text-[color:var(--base\/white,white)] text-[length:var(--typography\/font-size\/body-base,14px)] top-[214px] tracking-[var(--typography\/letter-spacing\/body-base,-0.14px)] whitespace-nowrap" data-node-id="I238:8366;217:2820">{`Tem nhãn decal & Phụ kiện niêm phong`}</p>
        <p className="[word-break:break-word] absolute font-[family-name:var(--typography\/font-family\/sans,'Inter:Semi_Bold')] font-[var(--emphasis\/font-weight\/bold,600)] leading-[var(--typography\/line-height\/body-base,20px)] left-[694px] not-italic text-[color:var(--base\/white,white)] text-[length:var(--typography\/font-size\/body-base,14px)] top-[48px] tracking-[var(--typography\/letter-spacing\/body-base,-0.14px)] whitespace-nowrap" data-node-id="I238:8366;217:2821">
          Chính sách mua hàng
        </p>
        <p className="[word-break:break-word] absolute font-[family-name:var(--typography\/font-family\/sans,'Inter:Regular')] font-[var(--emphasis\/font-weight\/regular,400)] leading-[var(--typography\/line-height\/body-base,20px)] left-[694px] not-italic text-[color:var(--base\/white,white)] text-[length:var(--typography\/font-size\/body-base,14px)] top-[84px] tracking-[var(--typography\/letter-spacing\/body-base,-0.14px)] whitespace-nowrap" data-node-id="I238:8366;217:2822">
          Chính sách đổi trả
        </p>
        <p className="[word-break:break-word] absolute font-[family-name:var(--typography\/font-family\/sans,'Inter:Regular')] font-[var(--emphasis\/font-weight\/regular,400)] leading-[var(--typography\/line-height\/body-base,20px)] left-[694px] not-italic text-[color:var(--base\/white,white)] text-[length:var(--typography\/font-size\/body-base,14px)] top-[110px] tracking-[var(--typography\/letter-spacing\/body-base,-0.14px)] whitespace-nowrap" data-node-id="I238:8366;217:2823">
          Chính sách thanh toán (Cọc 50%)
        </p>
        <p className="[word-break:break-word] absolute font-[family-name:var(--typography\/font-family\/sans,'Inter:Regular')] font-[var(--emphasis\/font-weight\/regular,400)] leading-[var(--typography\/line-height\/body-base,20px)] left-[694px] not-italic text-[color:var(--base\/white,white)] text-[length:var(--typography\/font-size\/body-base,14px)] top-[136px] tracking-[var(--typography\/letter-spacing\/body-base,-0.14px)] whitespace-nowrap" data-node-id="I238:8366;217:2824">
          Giá chưa gồm VAT 8% và vận chuyển
        </p>
        <p className="[word-break:break-word] absolute font-[family-name:var(--typography\/font-family\/sans,'Inter:Regular')] font-[var(--emphasis\/font-weight\/regular,400)] leading-[var(--typography\/line-height\/body-base,20px)] left-[694px] not-italic text-[color:var(--base\/white,white)] text-[length:var(--typography\/font-size\/body-base,14px)] top-[162px] tracking-[var(--typography\/letter-spacing\/body-base,-0.14px)] whitespace-nowrap" data-node-id="I238:8366;217:2825">
          Quy chuẩn duyệt màu đèn D50
        </p>
        <p className="[word-break:break-word] absolute font-[family-name:var(--typography\/font-family\/sans,'Inter:Regular')] font-[var(--emphasis\/font-weight\/regular,400)] leading-[var(--typography\/line-height\/body-base,20px)] left-[694px] not-italic text-[color:var(--base\/white,white)] text-[length:var(--typography\/font-size\/body-base,14px)] top-[188px] tracking-[var(--typography\/letter-spacing\/body-base,-0.14px)] whitespace-nowrap" data-node-id="I238:8366;217:2826">
          Hồ sơ năng lực - GÓI Q12
        </p>
        <p className="[word-break:break-word] absolute font-[family-name:var(--typography\/font-family\/sans,'Inter:Regular')] font-[var(--emphasis\/font-weight\/regular,400)] leading-[var(--typography\/line-height\/body-base,20px)] left-[694px] not-italic text-[color:var(--base\/white,white)] text-[length:var(--typography\/font-size\/body-base,14px)] top-[214px] tracking-[var(--typography\/letter-spacing\/body-base,-0.14px)] whitespace-nowrap" data-node-id="I238:8366;217:2827">
          Vật liệu đạt RoHS · CA65
        </p>
        <p className="[word-break:break-word] absolute font-[family-name:var(--typography\/font-family\/sans,'Inter:Semi_Bold')] font-[var(--emphasis\/font-weight\/bold,600)] leading-[var(--typography\/line-height\/body-base,20px)] left-[994px] not-italic text-[color:var(--base\/white,white)] text-[length:var(--typography\/font-size\/body-base,14px)] top-[48px] tracking-[var(--typography\/letter-spacing\/body-base,-0.14px)] whitespace-nowrap" data-node-id="I238:8366;217:2828">
          Liên hệ GÓI
        </p>
        <div className="absolute left-[994px] size-[16px] top-[85px]" data-node-id="I238:8366;217:2829" data-name="Icon/pin">
          <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIconPin} />
        </div>
        <p className="[word-break:break-word] absolute font-[family-name:var(--typography\/font-family\/sans,'Inter:Regular')] font-[var(--emphasis\/font-weight\/regular,400)] leading-[var(--typography\/line-height\/body-base,20px)] left-[1018px] not-italic text-[color:var(--paper\/subtle,#ececec)] text-[length:var(--typography\/font-size\/body-base,14px)] top-[84px] tracking-[var(--typography\/letter-spacing\/body-base,-0.14px)] w-[356px]" data-node-id="I238:8366;217:2830">
          Xưởng: 36/6H Trần Thị Hè, P. Tân Thới Hiệp, Q12, TP.HCM
        </p>
        <div className="absolute left-[994px] size-[16px] top-[127px]" data-node-id="I238:8366;217:2831" data-name="Icon/phone">
          <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIconPhone1} />
        </div>
        <p className="[word-break:break-word] absolute font-[family-name:var(--typography\/font-family\/sans,'Inter:Regular')] font-[var(--emphasis\/font-weight\/regular,400)] leading-[var(--typography\/line-height\/body-base,20px)] left-[1018px] not-italic text-[color:var(--paper\/subtle,#ececec)] text-[length:var(--typography\/font-size\/body-base,14px)] top-[126px] tracking-[var(--typography\/letter-spacing\/body-base,-0.14px)] w-[356px]" data-node-id="I238:8366;217:2832">{`Thiết kế & tư vấn (Quang): 0387 365 020`}</p>
        <div className="absolute left-[994px] size-[16px] top-[155px]" data-node-id="I238:8366;217:2833" data-name="Icon/factory">
          <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIconFactory} />
        </div>
        <p className="[word-break:break-word] absolute font-[family-name:var(--typography\/font-family\/sans,'Inter:Regular')] font-[var(--emphasis\/font-weight\/regular,400)] leading-[var(--typography\/line-height\/body-base,20px)] left-[1018px] not-italic text-[color:var(--paper\/subtle,#ececec)] text-[length:var(--typography\/font-size\/body-base,14px)] top-[154px] tracking-[var(--typography\/letter-spacing\/body-base,-0.14px)] w-[356px]" data-node-id="I238:8366;217:2834">{`Xưởng & báo giá (My): 0981 047 115`}</p>
        <div className="absolute left-[994px] size-[16px] top-[183px]" data-node-id="I238:8366;217:2835" data-name="Icon/chat">
          <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIconChat1} />
        </div>
        <p className="[word-break:break-word] absolute font-[family-name:var(--typography\/font-family\/sans,'Inter:Regular')] font-[var(--emphasis\/font-weight\/regular,400)] leading-[var(--typography\/line-height\/body-base,20px)] left-[1018px] not-italic text-[color:var(--paper\/subtle,#ececec)] text-[length:var(--typography\/font-size\/body-base,14px)] top-[182px] tracking-[var(--typography\/letter-spacing\/body-base,-0.14px)] w-[356px]" data-node-id="I238:8366;217:2836">
          Zalo OA: 0387 365 020 (Hỗ trợ 24/7)
        </p>
        <div className="absolute h-px left-[64px] top-[280px] w-[1312px]" data-node-id="I238:8366;217:2837" data-name="Divider Top" />
        <p className="[word-break:break-word] absolute font-[family-name:var(--typography\/font-family\/sans,'Inter:Semi_Bold')] font-[var(--emphasis\/font-weight\/bold,600)] leading-[var(--typography\/line-height\/body-base,20px)] left-[870px] not-italic text-[color:var(--base\/white,white)] text-[length:var(--typography\/font-size\/body-base,14px)] top-[310px] tracking-[var(--typography\/letter-spacing\/body-base,-0.14px)] whitespace-nowrap" data-node-id="I238:8366;217:2838">
          Liên kết nhanh
        </p>
        <p className="[word-break:break-word] absolute font-[family-name:var(--typography\/font-family\/sans,'Inter:Regular')] font-[var(--emphasis\/font-weight\/regular,400)] leading-[var(--typography\/line-height\/body-base,20px)] left-[870px] not-italic text-[color:var(--base\/white,white)] text-[length:var(--typography\/font-size\/body-base,14px)] top-[346px] tracking-[var(--typography\/letter-spacing\/body-base,-0.14px)] whitespace-nowrap" data-node-id="I238:8366;217:2839">
          Trang chủ
        </p>
        <p className="[word-break:break-word] absolute font-[family-name:var(--typography\/font-family\/sans,'Inter:Regular')] font-[var(--emphasis\/font-weight\/regular,400)] leading-[var(--typography\/line-height\/body-base,20px)] left-[870px] not-italic text-[color:var(--base\/white,white)] text-[length:var(--typography\/font-size\/body-base,14px)] top-[372px] tracking-[var(--typography\/letter-spacing\/body-base,-0.14px)] whitespace-nowrap" data-node-id="I238:8366;217:2840">
          Dự án đã bàn giao
        </p>
        <p className="[word-break:break-word] absolute font-[family-name:var(--typography\/font-family\/sans,'Inter:Regular')] font-[var(--emphasis\/font-weight\/regular,400)] leading-[var(--typography\/line-height\/body-base,20px)] left-[870px] not-italic text-[color:var(--base\/white,white)] text-[length:var(--typography\/font-size\/body-base,14px)] top-[398px] tracking-[var(--typography\/letter-spacing\/body-base,-0.14px)] whitespace-nowrap" data-node-id="I238:8366;217:2841">
          Bảng giá xưởng
        </p>
        <p className="[word-break:break-word] absolute font-[family-name:var(--typography\/font-family\/sans,'Inter:Regular')] font-[var(--emphasis\/font-weight\/regular,400)] leading-[var(--typography\/line-height\/body-base,20px)] left-[870px] not-italic text-[color:var(--base\/white,white)] text-[length:var(--typography\/font-size\/body-base,14px)] top-[424px] tracking-[var(--typography\/letter-spacing\/body-base,-0.14px)] whitespace-nowrap" data-node-id="I238:8366;217:2842">
          Quy trình sản xuất
        </p>
        <p className="[word-break:break-word] absolute font-[family-name:var(--typography\/font-family\/sans,'Inter:Regular')] font-[var(--emphasis\/font-weight\/regular,400)] leading-[var(--typography\/line-height\/body-base,20px)] left-[1010px] not-italic text-[color:var(--base\/white,white)] text-[length:var(--typography\/font-size\/body-base,14px)] top-[346px] tracking-[var(--typography\/letter-spacing\/body-base,-0.14px)] whitespace-nowrap" data-node-id="I238:8366;217:2843">
          Sản phẩm
        </p>
        <p className="[word-break:break-word] absolute font-[family-name:var(--typography\/font-family\/sans,'Inter:Regular')] font-[var(--emphasis\/font-weight\/regular,400)] leading-[var(--typography\/line-height\/body-base,20px)] left-[1010px] not-italic text-[color:var(--base\/white,white)] text-[length:var(--typography\/font-size\/body-base,14px)] top-[372px] tracking-[var(--typography\/letter-spacing\/body-base,-0.14px)] whitespace-nowrap" data-node-id="I238:8366;217:2844">{`Tin tức & Cẩm nang`}</p>
        <p className="[word-break:break-word] absolute font-[family-name:var(--typography\/font-family\/sans,'Inter:Regular')] font-[var(--emphasis\/font-weight\/regular,400)] leading-[var(--typography\/line-height\/body-base,20px)] left-[1010px] not-italic text-[color:var(--base\/white,white)] text-[length:var(--typography\/font-size\/body-base,14px)] top-[398px] tracking-[var(--typography\/letter-spacing\/body-base,-0.14px)] whitespace-nowrap" data-node-id="I238:8366;217:2845">
          Hồ sơ năng lực
        </p>
        <p className="[word-break:break-word] absolute font-[family-name:var(--typography\/font-family\/sans,'Inter:Regular')] font-[var(--emphasis\/font-weight\/regular,400)] leading-[var(--typography\/line-height\/body-base,20px)] left-[1010px] not-italic text-[color:var(--base\/white,white)] text-[length:var(--typography\/font-size\/body-base,14px)] top-[424px] tracking-[var(--typography\/letter-spacing\/body-base,-0.14px)] whitespace-nowrap" data-node-id="I238:8366;217:2846">
          Liên hệ tư vấn
        </p>
        <div className="absolute h-px left-[64px] top-[630px] w-[1312px]" data-node-id="I238:8366;217:2847" data-name="Divider Bottom" />
        <p className="[word-break:break-word] absolute font-[family-name:var(--typography\/font-family\/sans,'Inter:Regular')] font-[var(--emphasis\/font-weight\/regular,400)] leading-[var(--typography\/line-height\/body-small,16px)] left-[64px] not-italic text-[color:var(--base\/white,white)] text-[length:var(--typography\/font-size\/body-small,12px)] top-[660px] tracking-[var(--typography\/letter-spacing\/body-small,0px)] whitespace-nowrap" data-node-id="I238:8366;217:2848">
          © 2026 GÓI - Xưởng bao bì giấy số lượng nhỏ. All rights reserved.
        </p>
        <p className="[word-break:break-word] absolute font-[family-name:var(--typography\/font-family\/sans,'Inter:Regular')] font-[var(--emphasis\/font-weight\/regular,400)] leading-[var(--typography\/line-height\/body-small,16px)] left-[880px] not-italic text-[#9ca3af] text-[length:var(--typography\/font-size\/body-small,12px)] top-[660px] tracking-[var(--typography\/letter-spacing\/body-small,0px)] whitespace-nowrap" data-node-id="I238:8366;217:2849">
          Nhà máy sản xuất thiết kế in ấn bao bì giấy trực tiếp tại Quận 12
        </p>
        <div className="absolute bg-[var(--line\/default,rgba(1,1,1,0.13))] left-[1340px] overflow-clip rounded-[var(--radius\/luxury,12px)] size-[36px] top-[650px]" data-node-id="I238:8366;217:2850" data-name="Scroll to Top Button">
          <div className="absolute left-[10.5px] size-[19px] top-[8px]" data-node-id="I238:8366;217:2851" data-name="Icon/arrowU">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIconArrowU} />
          </div>
        </div>
        <div className="absolute bg-[var(--brand\/red,#ff6bd5)] left-[1332px] overflow-clip rounded-[var(--radius\/luxury,12px)] size-[52px] top-[580px]" data-node-id="I238:8366;217:2852" data-name="Floating Chat Widget">
          <div className="absolute left-[16px] size-[18px] top-[16px]" data-node-id="I238:8366;217:2853" data-name="Icon/chat">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIconChat2} />
          </div>
        </div>
        <div className="[word-break:break-word] absolute font-[family-name:var(--typography\/font-family\/heading,'Lora:SemiBold')] font-[var(--emphasis\/font-weight\/bold,600)] leading-[0] left-[1105px] text-[color:var(--base\/white,white)] text-[length:var(--typography\/font-size\/heading-2,30px)] top-[306px] tracking-[var(--typography\/letter-spacing\/heading-2,-0.6px)] whitespace-nowrap" data-node-id="I238:8366;217:2854">
          <p className="leading-[33px] mb-0">GÓI - Một khởi đầu.</p>
          <p className="leading-[33px] text-[#d7262b]">GÓI - Trọn dấu ấn</p>
        </div>
        <div className="absolute content-stretch flex items-start left-[1105px] top-[415px]" data-node-id="I238:8366;217:2855" data-name="Deco · CMYK">
          <div className="bg-[#00a0e9] relative shrink-0 size-[10px]" data-node-id="I238:8366;217:2855;158:553" data-name="Rectangle" />
          <div className="bg-[#e4007f] relative shrink-0 size-[10px]" data-node-id="I238:8366;217:2855;158:554" data-name="Rectangle" />
          <div className="bg-[#fff100] relative shrink-0 size-[10px]" data-node-id="I238:8366;217:2855;158:555" data-name="Rectangle" />
          <div className="bg-[var(--ink\/strong,#121212)] relative shrink-0 size-[10px]" data-node-id="I238:8366;217:2855;158:556" data-name="Rectangle" />
          <div className="bg-[var(--ink\/strong,#121212)] relative shrink-0 size-[10px]" data-node-id="I238:8366;217:2855;158:557" data-name="Rectangle" />
          <div className="bg-[var(--ink\/strong,#121212)] relative shrink-0 size-[10px]" data-node-id="I238:8366;217:2855;158:558" data-name="Rectangle" />
          <div className="bg-[var(--ink\/strong,#121212)] relative shrink-0 size-[10px]" data-node-id="I238:8366;217:2855;158:559" data-name="Rectangle" />
          <div className="bg-[var(--brand\/red,#ff6bd5)] relative shrink-0 size-[10px]" data-node-id="I238:8366;217:2855;158:560" data-name="Rectangle" />
          <div className="bg-[var(--brand\/gold-foil,#a67c2e)] relative shrink-0 size-[10px]" data-node-id="I238:8366;217:2855;158:561" data-name="Rectangle" />
        </div>
        <div className="absolute left-[1207px] size-[14px] top-[413px]" data-node-id="I238:8366;217:2856" data-name="Deco/Registration">
          <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgDecoRegistration1} />
        </div>
        <div className="absolute h-[300px] left-[64px] overflow-clip rounded-[var(--radius\/luxury,12px)] top-[310px] w-[400px]" data-node-id="I238:8366;217:2857" data-name="Sơ Đồ Xưởng (bản in)">
          <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[var(--radius\/luxury,12px)] size-full" src={imgSDXngBnIn} />
          <div className="absolute content-stretch flex flex-col gap-[4px] items-center left-[152px] overflow-clip top-[104px]" data-node-id="I238:8366;217:2858" data-name="Ghim Xưởng">
            <div className="relative shrink-0 size-[28px]" data-node-id="I238:8366;217:2859" data-name="Icon/pin">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIconPin1} />
            </div>
            <div className="bg-[var(--ink\/strong,#121212)] content-stretch flex items-start overflow-clip px-[8px] py-[4px] relative rounded-[var(--radius\/luxury,12px)] shrink-0" data-node-id="I238:8366;217:2860" data-name="Nhãn Xưởng">
              <p className="[word-break:break-word] font-[family-name:var(--typography\/font-family\/sans,'Inter:Semi_Bold')] font-[var(--emphasis\/font-weight\/bold,600)] leading-[var(--typography\/line-height\/label-small,12px)] not-italic relative shrink-0 text-[color:var(--base\/white,white)] text-[length:var(--typography\/font-size\/label-small,9px)] tracking-[var(--typography\/letter-spacing\/label-small,0px)] whitespace-nowrap" data-node-id="I238:8366;217:2861">
                XƯỞNG GÓI · Q.12
              </p>
            </div>
          </div>
          <div className="absolute bg-[var(--base\/white,white)] border border-[var(--line\/default,rgba(1,1,1,0.13))] border-solid content-stretch flex flex-col gap-[2px] items-start left-[12px] overflow-clip px-[10px] py-[8px] rounded-[var(--radius\/luxury,12px)] top-[236px]" data-node-id="I238:8366;217:2862" data-name="Địa chỉ">
            <p className="[word-break:break-word] font-[family-name:var(--typography\/font-family\/sans,'Inter:Medium')] font-[var(--emphasis\/font-weight\/medium,500)] leading-[var(--typography\/line-height\/caption,16px)] not-italic relative shrink-0 text-[color:var(--ink\/strong,#121212)] text-[length:var(--typography\/font-size\/caption,11px)] tracking-[var(--typography\/letter-spacing\/caption,0px)] whitespace-nowrap" data-node-id="I238:8366;217:2863">
              36/6H Trần Thị Hè, P. Tân Thới Hiệp, Q.12
            </p>
            <div className="content-stretch flex gap-[4px] items-center overflow-clip relative shrink-0" data-node-id="I238:8366;217:2864" data-name="Btn Chỉ Đường">
              <p className="[word-break:break-word] font-[family-name:var(--typography\/font-family\/sans,'Inter:Semi_Bold')] font-[var(--emphasis\/font-weight\/bold,600)] leading-[var(--typography\/line-height\/caption,16px)] not-italic relative shrink-0 text-[color:var(--brand\/red,#ff6bd5)] text-[length:var(--typography\/font-size\/caption,11px)] tracking-[var(--typography\/letter-spacing\/caption,0px)] whitespace-nowrap" data-node-id="I238:8366;217:2865">
                Chỉ đường Google Maps
              </p>
              <div className="relative shrink-0 size-[12px]" data-node-id="I238:8366;217:2866" data-name="Icon/arrowUR">
                <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIconArrowUr} />
              </div>
            </div>
          </div>
          <div className="absolute content-stretch flex items-start left-[298px] top-[12px]" data-node-id="I238:8366;217:2867" data-name="Deco/CMYK Bar">
            <div className="bg-[#00a0e9] relative shrink-0 size-[10px]" data-node-id="I238:8366;217:2867;158:553" data-name="Rectangle" />
            <div className="bg-[#e4007f] relative shrink-0 size-[10px]" data-node-id="I238:8366;217:2867;158:554" data-name="Rectangle" />
            <div className="bg-[#fff100] relative shrink-0 size-[10px]" data-node-id="I238:8366;217:2867;158:555" data-name="Rectangle" />
            <div className="bg-[var(--ink\/strong,#121212)] relative shrink-0 size-[10px]" data-node-id="I238:8366;217:2867;158:556" data-name="Rectangle" />
            <div className="bg-[var(--ink\/strong,#121212)] relative shrink-0 size-[10px]" data-node-id="I238:8366;217:2867;158:557" data-name="Rectangle" />
            <div className="bg-[var(--ink\/strong,#121212)] relative shrink-0 size-[10px]" data-node-id="I238:8366;217:2867;158:558" data-name="Rectangle" />
            <div className="bg-[var(--ink\/strong,#121212)] relative shrink-0 size-[10px]" data-node-id="I238:8366;217:2867;158:559" data-name="Rectangle" />
            <div className="bg-[var(--brand\/red,#ff6bd5)] relative shrink-0 size-[10px]" data-node-id="I238:8366;217:2867;158:560" data-name="Rectangle" />
            <div className="bg-[var(--brand\/gold-foil,#a67c2e)] relative shrink-0 size-[10px]" data-node-id="I238:8366;217:2867;158:561" data-name="Rectangle" />
          </div>
          <p className="[word-break:break-word] absolute font-['Inter:Medium'] font-medium leading-[normal] left-[320px] not-italic text-[9px] text-[color:var(--ink\/muted,rgba(0,0,0,0.69))] top-[283px] whitespace-nowrap" data-node-id="I238:8366;217:2868">
            Bản đồ ©Google
          </p>
        </div>
        <div className="absolute h-[300px] left-[64px] top-[310px] w-[400px]" data-node-id="I238:8366;217:2869" data-name="Deco · Crop marks">
          <div className="absolute bg-[var(--base\/white,white)] h-[0.75px] left-[-28px] top-0 w-[18px]" data-node-id="I238:8366;217:2869;158:539" data-name="Rectangle" />
          <div className="absolute bg-[var(--base\/white,white)] h-[18px] left-0 top-[-28px] w-[0.75px]" data-node-id="I238:8366;217:2869;158:540" data-name="Rectangle" />
          <div className="absolute bg-[var(--base\/white,white)] h-[0.75px] right-[-28px] top-0 w-[18px]" data-node-id="I238:8366;217:2869;158:541" data-name="Rectangle" />
          <div className="absolute bg-[var(--base\/white,white)] h-[18px] right-0 top-[-28px] w-[0.75px]" data-node-id="I238:8366;217:2869;158:542" data-name="Rectangle" />
          <div className="absolute bg-[var(--base\/white,white)] bottom-0 h-[0.75px] left-[-28px] w-[18px]" data-node-id="I238:8366;217:2869;158:543" data-name="Rectangle" />
          <div className="absolute bg-[var(--base\/white,white)] bottom-[-28px] h-[18px] left-0 w-[0.75px]" data-node-id="I238:8366;217:2869;158:544" data-name="Rectangle" />
          <div className="absolute bg-[var(--base\/white,white)] bottom-0 h-[0.75px] right-[-28px] w-[18px]" data-node-id="I238:8366;217:2869;158:545" data-name="Rectangle" />
          <div className="absolute bg-[var(--base\/white,white)] bottom-[-28px] h-[18px] right-0 w-[0.75px]" data-node-id="I238:8366;217:2869;158:546" data-name="Rectangle" />
        </div>
        <div className="absolute bg-[var(--brand\/red,#ff6bd5)] h-[6px] left-0 top-0 w-[1440px]" data-node-id="I238:8366;217:2870" data-name="Deco · Viền đỏ" />
        <div className="absolute bg-white h-[300px] left-[488px] overflow-clip rounded-[var(--radius\/luxury,12px)] top-[310px] w-[360px]" data-node-id="I238:8366;217:2871" data-name="Kênh Facebook">
          <div className="absolute h-[118px] left-0 top-0 w-[360px]" data-node-id="I238:8366;217:2872" data-name="Ảnh Bìa Facebook">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <img alt="" className="absolute h-[108.7%] left-[-85.19%] max-w-none top-0 w-[185.19%]" src={imgNhBiaFacebook} />
            </div>
          </div>
          <div className="absolute left-[16px] size-[84px] top-[74px]" data-node-id="I238:8366;217:2873" data-name="Avatar GÓI">
            <div className="absolute inset-[-3.57%]">
              <img alt="" className="block max-w-none size-full" height="90" src={imgAvatarGoi} width="90" />
            </div>
          </div>
          <p className="[word-break:break-word] absolute font-['Inter:Bold'] font-bold leading-[normal] left-[112px] not-italic text-[#17181c] text-[22px] top-[124px] whitespace-nowrap" data-node-id="I238:8366;217:2874">
            GÓI
          </p>
          <p className="[word-break:break-word] absolute font-['Inter:Semi_Bold'] font-semibold leading-[normal] left-[112px] not-italic text-[#17181c] text-[12px] top-[152px] whitespace-nowrap" data-node-id="I238:8366;217:2875">
            37 người theo dõi • 7 đang theo dõi
          </p>
          <div className="[word-break:break-word] absolute font-['Inter:Regular'] font-normal leading-[0] left-[16px] not-italic text-[#17181c] text-[12px] top-[172px] w-[200px]" data-node-id="I238:8366;217:2876">
            <p className="leading-[17px] mb-0">GÓI - Một khởi đầu.</p>
            <p className="leading-[17px]">GÓI - Trọn dấu ấn</p>
          </div>
          <p className="[word-break:break-word] absolute font-['Inter:Medium'] font-medium leading-[normal] left-[16px] not-italic text-[#555965] text-[12px] top-[210px] whitespace-nowrap" data-node-id="I238:8366;217:2877">
            Dịch vụ in ấn · Quận 12, TP.HCM
          </p>
          <div className="absolute bg-[#1877f2] content-stretch flex gap-[6px] h-[34px] items-center justify-center left-[16px] overflow-clip rounded-[var(--radius\/luxury,12px)] top-[236px] w-[200px]" data-node-id="I238:8366;217:2878" data-name="Btn Theo Dõi FB">
            <div className="relative shrink-0 size-[16px]" data-node-id="I238:8366;217:2879" data-name="Icon/facebook">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIconFacebook} />
            </div>
            <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[13px] text-white whitespace-nowrap" data-node-id="I238:8366;217:2880">
              Theo dõi
            </p>
          </div>
          <div className="absolute bg-[#e4e6eb] content-stretch flex gap-[6px] h-[34px] items-center justify-center left-[224px] overflow-clip rounded-[var(--radius\/luxury,12px)] top-[236px] w-[120px]" data-node-id="I238:8366;217:2881" data-name="Btn Nhắn Tin FB">
            <div className="relative shrink-0 size-[16px]" data-node-id="I238:8366;217:2882" data-name="Icon/chat">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIconChat3} />
            </div>
            <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[#17181c] text-[13px] whitespace-nowrap" data-node-id="I238:8366;217:2883">
              Nhắn tin
            </p>
          </div>
          <div className="absolute bg-[rgba(23,24,28,0.12)] h-px left-[16px] top-[280px] w-[328px]" data-node-id="I238:8366;217:2884" data-name="Tab Line" />
          <p className="[word-break:break-word] absolute font-['Inter:Semi_Bold'] font-semibold leading-[normal] left-[16px] not-italic text-[#1877f2] text-[11px] top-[284px] whitespace-nowrap" data-node-id="I238:8366;217:2885">
            Tất cả
          </p>
          <div className="absolute bg-[#1877f2] h-[2px] left-[16px] top-[298px] w-[33px]" data-node-id="I238:8366;217:2886" data-name="Rectangle" />
          <p className="[word-break:break-word] absolute font-['Inter:Semi_Bold'] font-semibold leading-[normal] left-[65px] not-italic text-[#555965] text-[11px] top-[284px] whitespace-nowrap" data-node-id="I238:8366;217:2887">
            Giới thiệu
          </p>
          <p className="[word-break:break-word] absolute font-['Inter:Semi_Bold'] font-semibold leading-[normal] left-[133px] not-italic text-[#555965] text-[11px] top-[284px] whitespace-nowrap" data-node-id="I238:8366;217:2888">
            Reels
          </p>
          <p className="[word-break:break-word] absolute font-['Inter:Semi_Bold'] font-semibold leading-[normal] left-[179px] not-italic text-[#555965] text-[11px] top-[284px] whitespace-nowrap" data-node-id="I238:8366;217:2889">
            Ảnh
          </p>
          <p className="[word-break:break-word] absolute font-['Inter:Semi_Bold'] font-semibold leading-[normal] left-[217px] not-italic text-[#555965] text-[11px] top-[284px] whitespace-nowrap" data-node-id="I238:8366;217:2890">
            Người theo dõi
          </p>
        </div>
      </div>
    </div>
  );
}