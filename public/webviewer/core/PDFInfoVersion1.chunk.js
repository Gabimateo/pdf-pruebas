/** Notice * This file contains works from many authors under various (but compatible) licenses. Please see core.txt for more information. **/
(function(){(window.wpCoreControlsBundle=window.wpCoreControlsBundle||[]).push([[9],{583:function(xa,ta,h){function ra(ea){ea.Ya();ea.advance();var aa=ea.current.textContent;ea.Kb();return aa}function na(ea){var aa=[];for(ea.Ya();ea.advance();){var ma=ea.qb();"field"===ma?aa.push(String(ea.ja("name"))):Object(a.j)("unrecognised field list element: "+ma)}ea.Kb();return aa}function oa(ea,aa){return aa?"false"!==ea:"true"===ea}function ja(ea,aa){var ma=ea.qb();switch(ma){case "javascript":return{name:"JavaScript",
javascript:ea.current.textContent};case "uri":return{name:"URI",uri:ea.ja("uri")};case "goto":ma=null;ea.Ya();if(ea.advance()){var la=ea.ja("fit");ma={page:ea.ja("page"),fit:la};if("0"===ma.page)Object(a.j)("null page encountered in dest");else switch(aa=aa(Number(ma.page)),la){case "Fit":case "FitB":break;case "FitH":case "FitBH":ma.top=aa.ya({x:0,y:ea.ja("top")||0}).y;break;case "FitV":case "FitBV":ma.left=aa.ya({x:ea.ja("left")||0,y:0}).x;break;case "FitR":la=aa.ya({x:ea.ja("left")||0,y:ea.ja("top")||
0});aa=aa.ya({x:ea.ja("right")||0,y:ea.ja("bottom")||0});aa=new w.d(la.x,la.y,aa.x,aa.y);ma.top=aa.y1;ma.left=aa.x1;ma.bottom=aa.y2;ma.right=aa.x2;break;case "XYZ":la=aa.ya({x:ea.ja("left")||0,y:ea.ja("top")||0});ma.top=la.y;ma.left=la.x;ma.zoom=ea.ja("zoom")||0;break;default:Object(a.j)("unknown dest fit: "+la)}ma={name:"GoTo",dest:ma}}else Object(a.j)("missing dest in GoTo action");ea.Kb();return ma;case "submit-form":ma={name:"SubmitForm",url:ea.ja("url"),format:ea.ja("format"),method:ea.ja("method")||
"POST",exclude:oa(ea.ja("exclude"),!1)};aa=ea.ja("flags");ma.flags=aa?aa.split(" "):[];for(ea.Ya();ea.advance();)switch(aa=ea.qb(),aa){case "fields":ma.fields=na(ea);break;default:Object(a.j)("unrecognised submit-form child: "+aa)}ea.Kb();return ma;case "reset-form":ma={name:"ResetForm",exclude:oa(ea.ja("exclude"),!1)};for(ea.Ya();ea.advance();)switch(aa=ea.qb(),aa){case "fields":ma.fields=na(ea);break;default:Object(a.j)("unrecognised reset-form child: "+aa)}ea.Kb();return ma;case "hide":ma={name:"Hide",
hide:oa(ea.ja("hide"),!0)};for(ea.Ya();ea.advance();)switch(aa=ea.qb(),aa){case "fields":ma.fields=na(ea);break;default:Object(a.j)("unrecognised hide child: "+aa)}ea.Kb();return ma;case "named":return{name:"Named",action:ea.ja("name")};default:Object(a.j)("Encountered unexpected action type: "+ma)}return null}function ka(ea,aa,ma){var la={};for(ea.Ya();ea.advance();){var ha=ea.qb();switch(ha){case "action":ha=ea.ja("trigger");if(aa?-1!==aa.indexOf(ha):1){la[ha]=[];for(ea.Ya();ea.advance();){var qa=
ja(ea,ma);Object(b.isNull)(qa)||la[ha].push(qa)}ea.Kb()}else Object(a.j)("encountered unexpected trigger on field: "+ha);break;default:Object(a.j)("encountered unknown action child: "+ha)}}ea.Kb();return la}function fa(ea){return new ba.a(ea.ja("r")||0,ea.ja("g")||0,ea.ja("b")||0,ea.ja("a")||1)}function x(ea,aa){var ma=ea.ja("name"),la=ea.ja("type")||"Type1",ha=ea.ja("size"),qa=aa.ya({x:0,y:0});ha=aa.ya({x:Number(ha),y:0});aa=qa.x-ha.x;qa=qa.y-ha.y;ma={name:ma,type:la,size:Math.sqrt(aa*aa+qa*qa)||
0,strokeColor:[0,0,0],fillColor:[0,0,0]};for(ea.Ya();ea.advance();)switch(la=ea.qb(),la){case "stroke-color":ma.strokeColor=fa(ea);break;case "fill-color":ma.fillColor=fa(ea);break;default:Object(a.j)("unrecognised font child: "+la)}ea.Kb();return ma}function y(ea){var aa=[];for(ea.Ya();ea.advance();){var ma=ea.qb();switch(ma){case "option":ma=aa;var la=ma.push;var ha=ea;ha={value:ha.ja("value"),displayValue:ha.ja("display-value")||void 0};la.call(ma,ha);break;default:Object(a.j)("unrecognised options child: "+
ma)}}ea.Kb();return aa}function r(ea,aa){var ma=ea.ja("name"),la={type:ea.ja("type"),quadding:ea.ja("quadding")||"Left-justified",maxLen:ea.ja("max-len")||-1},ha=ea.ja("flags");Object(b.isString)(ha)&&(la.flags=ha.split(" "));for(ea.Ya();ea.advance();)switch(ha=ea.qb(),ha){case "actions":la.actions=ka(ea,["C","F","K","V"],function(){return aa});break;case "default-value":la.defaultValue=ra(ea);break;case "font":la.font=x(ea,aa);break;case "options":la.options=y(ea);break;default:Object(a.j)("unknown field child: "+
ha)}ea.Kb();return new window.da.Annotations.la.wa(ma,la)}function n(ea,aa){switch(ea.type){case "Tx":try{if(Object(ia.c)(ea.actions))return new e.a.DatePickerWidgetAnnotation(ea,aa)}catch(ma){Object(a.j)(ma)}return new e.a.TextWidgetAnnotation(ea,aa);case "Ch":return ea.flags.get(z.WidgetFlags.COMBO)?new e.a.ChoiceWidgetAnnotation(ea,aa):new e.a.ListWidgetAnnotation(ea,aa);case "Btn":return ea.flags.get(z.WidgetFlags.PUSH_BUTTON)?new e.a.PushButtonWidgetAnnotation(ea,aa):ea.flags.get(z.WidgetFlags.RADIO)?
new e.a.RadioButtonWidgetAnnotation(ea,aa):new e.a.CheckButtonWidgetAnnotation(ea,aa);case "Sig":return new e.a.SignatureWidgetAnnotation(ea,aa);default:Object(a.j)("Unrecognised field type: "+ea.type)}return null}function f(ea,aa,ma,la){var ha=[],qa={};ea.Ya();var pa=[],sa={},ua=[];Object(ca.a)(function(){if(ea.advance()){var wa=ea.qb();switch(wa){case "calculation-order":pa="calculation-order"===ea.qb()?na(ea):[];break;case "document-actions":sa=ka(ea,["Init","Open"],aa);break;case "pages":wa=[];
for(ea.Ya();ea.advance();){var Ba=ea.qb();switch(Ba){case "page":Ba=wa;var Ca=Ba.push,Aa=ea,La=aa,Ea={number:Aa.ja("number")};for(Aa.Ya();Aa.advance();){var Ka=Aa.qb();switch(Ka){case "actions":Ea.actions=ka(Aa,["O","C"],La);break;default:Object(a.j)("unrecognised page child: "+Ka)}}Aa.Kb();Ca.call(Ba,Ea);break;default:Object(a.j)("unrecognised page child: "+Ba)}}ea.Kb();ua=wa;break;case "field":Ba=r(ea,aa(1));qa[Ba.name]=Ba;break;case "widget":wa={border:{style:"Solid",width:1},backgroundColor:[],
fieldName:ea.ja("field"),page:ea.ja("page"),index:ea.ja("index")||0,rotation:ea.ja("rotation")||0,flags:[],isImporting:!0};(Ba=ea.ja("appearance"))&&(wa.appearance=Ba);(Ba=ea.ja("flags"))&&(wa.flags=Ba.split(" "));for(ea.Ya();ea.advance();)switch(Ba=ea.qb(),Ba){case "rect":Ca=ea;Aa=aa(Number(wa.page));Ba=Aa.ya({x:Ca.ja("x1")||0,y:Ca.ja("y1")||0});Ca=Aa.ya({x:Ca.ja("x2")||0,y:Ca.ja("y2")||0});Ba=new w.d(Ba.x,Ba.y,Ca.x,Ca.y);Ba.normalize();wa.rect={x1:Ba.x1,y1:Ba.y1,x2:Ba.x2,y2:Ba.y2};break;case "border":Ba=
ea;Ca={style:Ba.ja("style")||"Solid",width:Ba.ja("width")||1,color:[0,0,0]};for(Ba.Ya();Ba.advance();)switch(Aa=Ba.qb(),Aa){case "color":Ca.color=fa(Ba);break;default:Object(a.j)("unrecognised border child: "+Aa)}Ba.Kb();wa.border=Ca;break;case "background-color":wa.backgroundColor=fa(ea);break;case "actions":wa.actions=ka(ea,"E X D U Fo Bl PO PC PV PI".split(" "),aa);break;case "appearances":Ba=ea;Ca=Object(ia.b)(wa,"appearances");for(Ba.Ya();Ba.advance();)if(Aa=Ba.qb(),"appearance"===Aa){Aa=Ba.ja("name");
La=Object(ia.b)(Ca,Aa);Aa=Ba;for(Aa.Ya();Aa.advance();)switch(Ea=Aa.qb(),Ea){case "Normal":Object(ia.b)(La,"Normal").data=Aa.current.textContent;break;default:Object(a.j)("unexpected appearance state: ",Ea)}Aa.Kb()}else Object(a.j)("unexpected appearances child: "+Aa);Ba.Kb();break;case "extra":Ba=ea;Ca=aa;Aa={};for(Ba.Ya();Ba.advance();)switch(La=Ba.qb(),La){case "font":Aa.font=x(Ba,Ca(1));break;default:Object(a.j)("unrecognised extra child: "+La)}Ba.Kb();Ba=Aa;Ba.font&&(wa.font=Ba.font);break;case "captions":Ca=
ea;Ba={};(Aa=Ca.ja("Normal"))&&(Ba.Normal=Aa);(Aa=Ca.ja("Rollover"))&&(Ba.Rollover=Aa);(Ca=Ca.ja("Down"))&&(Ba.Down=Ca);wa.captions=Ba;break;default:Object(a.j)("unrecognised widget child: "+Ba)}ea.Kb();(Ba=qa[wa.fieldName])?(wa=n(Ba,wa),ha.push(wa)):Object(a.j)("ignoring widget with no corresponding field data: "+wa.fieldName);break;default:Object(a.j)("Unknown element encountered in PDFInfo: "+wa)}return!0}return!1},function(){ea.Kb();ma({calculationOrder:pa,widgets:ha,fields:qa,documentActions:sa,
pages:ua,custom:[]})},la)}h.r(ta);h.d(ta,"parse",function(){return f});var a=h(3),b=h(1);h.n(b);var e=h(150),w=h(4),ba=h(9),ca=h(28),ia=h(132),z=h(20)}}]);}).call(this || window)
