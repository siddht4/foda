game.skills.lina = {
  fire: {
    cast: function (skill, source, target) {
      var range = skill.data('aoe range');
      var width = skill.data('aoe width');
      var damage = skill.data('damage');
      source.opponentsInLine(target, range, width, function (card) {
        source.damage(damage, card, skill.data('damage type'));
      }, source);
    }
  },
  stun: {
    cast: function (skill, source, target) {
      var range = skill.data('aoe range');
      var opponent = source.opponent();
      target.cardsInRange(range, function (card) {
        if (card.hasClass(opponent)) {
          source.damage(skill.data('damage'), card, skill.data('damage type'));
          source.addStun(card, skill);
        }
        if (card.hasClass('trees')) {
          game.tree.destroy(card);
        }
      }, source);
    }
  },
  passive: {
    passive: function (skill, source) {
      source.addBuff(source, skill);
    }
  },
  ult: {
    cast: function (skill, source, target) {
      source.damage(skill.data('damage'), target, skill.data('damage type'));
    }
  }
};
